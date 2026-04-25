"""
Blog Post Generator using Gemini AI.
Generates engaging Finnish language learning content.
"""

from google import genai
from google.genai import types
from typing import Dict, List, Optional
import random
import re
import time
from google.genai.errors import ClientError

from .config import (
    GEMINI_API_KEY, TEXT_MODEL, BLOG_SETTINGS, DEFAULT_LEVEL,
    CONTENT_MIX, LEARNING_CATEGORIES, CULTURE_CATEGORIES
)
from .topic_manager import TopicManager


def get_client():
    """Get the Gemini client."""
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY not found. Please set it in your .env file.")
    return genai.Client(api_key=GEMINI_API_KEY)





def pick_content_type() -> str:
    """
    Randomly select whether the next post should be learning-focused or culture-focused,
    based on the configured CONTENT_MIX ratio (default 60% learning / 40% culture).
    """
    return "learning" if random.random() < CONTENT_MIX["learning"] else "culture"


def generate_topic_suggestion(topic_manager: TopicManager, content_type: Optional[str] = None) -> Dict[str, str]:
    """
    Use AI to suggest a new topic based on history and available content.
    Uses Google Search to find trending/current Finnish topics.
    
    Args:
        topic_manager: TopicManager instance
        content_type: 'learning' or 'culture'. If None, randomly selected.
    
    Returns dict with: topic, category, brief, content_type
    """
    client = get_client()
    
    if content_type is None:
        content_type = pick_content_type()
    
    # Build category-specific guidance
    if content_type == "learning":
        categories_list = LEARNING_CATEGORIES
        focus_instruction = """## CONTENT FOCUS: PRACTICAL LEARNING
This post must be a PRACTICAL FINNISH LANGUAGE LEARNING article.
Focus on teaching useful Finnish skills: grammar tips, vocabulary, pronunciation,
everyday phrases, common mistakes, or practical language exercises.
The topic should help someone LEARN Finnish, not just read about Finnish culture.

Good examples:
- "Master Finnish Greetings: Beyond Moi and Hei"
- "Finnish Numbers 1-100: Tips, Tricks & Pronunciation"
- "5 Finnish Cases Every Beginner Struggles With (And How to Fix Them)"
- "Reading Finnish Menus: A Vocabulary Survival Guide"
- "Finnish vs English: Word Order Differences That Trip Up Beginners"
"""
    else:
        categories_list = CULTURE_CATEGORIES
        focus_instruction = """## CONTENT FOCUS: CULTURE & LIFESTYLE
This post should explore Finnish culture, traditions, travel, or lifestyle.
Bring Finland to life with engaging stories, local insights, and hidden gems.
Still include language elements, but the main angle is cultural discovery.

Good examples:
- "Inside a Finnish Pikkujoulu: The Best Pre-Christmas Party Tradition"
- "Why Finns Love Silence (And How It Makes Life Better)"
- "Hidden Gems of Tampere: Beyond the Factory Museums"
"""
    
    categories_str = '\n'.join(f'- {cat}' for cat in categories_list)
    
    prompt = f"""You are a creative Finnish language & culture editor planning blog topics.

FIRST: Use Google Search to find CURRENT and TRENDING topics about Finland. Search for:
- Recent Finnish news and events
- Upcoming Finnish holidays or celebrations
- Trending Finnish culture or language learning topics
- Current travel or lifestyle trends in Finland

{focus_instruction}

{topic_manager.suggest_topic_prompt()}

Based on your research and the banned concepts above, SUGGEST A COMPLETELY NEW TOPIC from these categories:
{categories_str}

The topic should be:
1. FRESH and not similar to any banned concepts
2. Engaging, like a magazine article title
3. Based on current events or trends if possible
4. Practical for people interested in Finland or learning Finnish

AVOID:
- Topics similar to banned concepts
- Purely grammatical titles like "The Genitive Case" (make it catchy!)
- Generic topics that could apply to any country

Remember to output in this exact format:
TOPIC: [topic title - specific, catchy, and UNIQUE]
CATEGORY: [category name]
BRIEF: [2-3 sentence description of what the post will teach/cover]
"""
    
    try:
        response = client.models.generate_content(
            model=TEXT_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                tools=[types.Tool(google_search=types.GoogleSearch())]
            )
        )
    except ClientError as e:
        if e.code == 429:
            print("⚠️ Rate limit hit with Google Search grounding. Falling back to standard generation without search...")
            # Fallback without search grounding
            response = client.models.generate_content(
                model=TEXT_MODEL,
                contents=prompt
            )
        else:
            raise
            
    text = response.text
    
    # Parse the response
    topic_match = re.search(r'TOPIC:\s*(.+?)(?:\n|$)', text)
    category_match = re.search(r'CATEGORY:\s*(.+?)(?:\n|$)', text)
    brief_match = re.search(r'BRIEF:\s*(.+?)(?:\n|$)', text, re.DOTALL)
    
    return {
        "topic": topic_match.group(1).strip() if topic_match else "Finnish Basics",
        "category": category_match.group(1).strip() if category_match else "General",
        "brief": brief_match.group(1).strip() if brief_match else "",
        "content_type": content_type
    }


def generate_blog_post(
    topic: str,
    date: str,
    category: Optional[str] = None,
    level: str = DEFAULT_LEVEL,
    custom_context: Optional[str] = None,
    content_type: str = "learning"
) -> Dict[str, str]:
    """
    Generate a complete blog post using Gemini AI.
    
    Args:
        topic: The topic to write about
        date: Publication date (YYYY-MM-DD)
        category: Topic category
        level: Finnish level (A1, A2, or A1-A2)
        custom_context: Optional additional context
        content_type: 'learning' or 'culture' - determines content structure
    
    Returns:
        Dict with: title, content, description, tags, slug, image_prompt
    """
    client = get_client()
    
    settings = BLOG_SETTINGS
    
    # Choose content structure based on content type
    if content_type == "learning":
        content_structure = """
### 4. CONTENT STRUCTURE (Use proper Markdown headings!)
Write {min_words}-{max_words} words using this EXACT structure.
This is a LEARNING-FOCUSED post. The primary goal is to teach Finnish.

**IMPORTANT: Include [IMAGE:description] markers** at 2-3 strategic locations in the content.
These markers tell us where to insert illustrations. Place them:
- After the introduction or first section
- Near vocabulary tables or phrase lists
- NEVER inside tables or lists

Example markers:
- [IMAGE:Colorful flashcards showing Finnish greeting phrases with pronunciation]
- [IMAGE:Cheerful illustration of a student practicing Finnish at a café]

```
# [Main Title]

[Engaging Hook: Why this lesson matters for Finnish learners]

## [Core Lesson Section 1]
[Primary teaching content (~30%): Introduce the main concept clearly.
Explain the grammar pattern, vocabulary theme, or pronunciation rule.
Use simple examples with Finnish + English side by side.
Share memory tricks, patterns, or beginner-friendly explanations.]

[IMAGE:description of an educational illustration related to the lesson]

## [Core Lesson Section 2]
[Continue the lesson (~30%): Go deeper with more examples, exceptions, or practice.
Include example dialogues, fill-in exercises, or comparison tables.
Keep it practical – focus on phrases people will actually use.]

### Key Phrases / Hyödyllisiä ilmauksia
[5-8 key phrases or sentences related to the topic]
- *Finnish phrase* — English translation
- *Finnish phrase* — English translation

### Vocabulary / Sanasto
[A table of 6-10 relevant words]

| Finnish | English | Example |
|---------|---------|---------|
| word | translation | *Example sentence* |

[IMAGE:description of a warm illustration connecting language to daily Finnish life]

## 🇫🇮 Cultural Context / Kulttuuritausta
[Cultural background (~25%): Connect the language lesson to real Finnish life.
Explain when/where Finns use these words, cultural nuances, or fun facts.
Help learners understand the "why" behind the language.]

## Quick Practice / Harjoitus
[Mini exercise (~15%): 2-3 quick practice questions or scenarios
where the reader can test what they learned.]

## Conclusion
[Encourage continued learning, suggest next steps]

## References
- [Source Name](URL)
- [Source Name](URL)
```
""".format(min_words=settings['min_words'], max_words=settings['max_words'])
        audience_desc = "Finnish language learners who want practical, actionable lessons"
        post_style = "a practical, engaging language learning article that teaches real Finnish skills"
    else:
        content_structure = """
### 4. CONTENT STRUCTURE (Use proper Markdown headings!)
Write {min_words}-{max_words} words using this EXACT structure.
This is a CULTURE-FOCUSED post. The primary goal is to explore Finnish culture with a language bonus.

**IMPORTANT: Include [IMAGE:description] markers** at 2-3 strategic locations in the content.
These markers tell us where to insert illustrations. Place them:
- After the first major cultural section (after a couple paragraphs)
- Before or after the Language Corner section
- NEVER inside tables or lists

Example markers:
- [IMAGE:Finnish family enjoying a traditional sauna experience]
- [IMAGE:Colorful vocabulary flashcards showing Finnish words for food]

```
# [Main Title]

[Engaging Hook Paragraph about the topic]

## [Engaging Subheading about the Cultural Aspect]
[Main content: Discuss the topic deep diving into Finnish culture, lifestyle, history, or travel tips.
Make this the bulk of the post (60%). Write in clear, engaging English.
Share interesting facts, local insights, and "hidden gems".
If it's about food, describe the taste/tradition. If travel, describe the experience.]

[IMAGE:description of a warm illustration showing the cultural scene]

## [Another Cultural Subheading]
[Continue the cultural exploration. Use specific examples, anecdotes, or advice.]

## 🇫🇮 Language Corner / Kielinurkka

[IMAGE:description of educational flashcard-style illustration related to vocabulary]

[This is the language lesson (40%). Teach specific vocabulary or phrases RELATED to the main topic above.]

### Useful Phrases
[3-5 key phrases related to the topic]
- *Phrase in Finnish* - English translation
- *Phrase in Finnish* - English translation

### Vocabulary / Sanasto
[A small table of 5-8 relevant words]

| Finnish | English | Example |
|---------|---------|---------|
| word | translation | *Example sentence* |

## Cultural Insight
[A "did you know" style fact or pro-tip related to the topic]

## Conclusion
[Wrap up the cultural journey and encourage them to visit/try it]

## References
- [Source Name](URL)
- [Source Name](URL)
```
""".format(min_words=settings['min_words'], max_words=settings['max_words'])
        audience_desc = "People interested in Finland, culture, travel, and lifestyle (plus language learners)"
        post_style = "an engaging, magazine-style blog post that explores Finnish culture with a language learning bonus"
    
    prompt = f"""You are an expert Finnish language and culture guide creating {post_style}.

## Topic Information
- Topic: {topic}
- Primary Keyword: "{topic}" (use this exact phrase strategically)
- Category: {category or 'Finnish Language Learning'}
- Target Audience: {audience_desc}
- Target Level: {level} (for Finnish language content)
- Publication Date: {date}
- Content Type: {content_type.upper()}

{f"## Additional Context: {custom_context}" if custom_context else ""}

## Blog Post Requirements

Create {post_style}. The content should be in English and very readable, with Finnish language elements woven throughout.

### 1. TITLE TAG (Critical for SEO)
- **Maximum 60 characters** (strict!)
- Include the primary keyword near the BEGINNING
- Make it inviting and descriptive
- Example: {"'Finnish Greetings: Master Hei, Moi & More'" if content_type == 'learning' else "'Finnish Sauna Culture: A Beginner\'s Guide'"}

### 2. META DESCRIPTION
- **~105 characters** (max 120)
- Active voice, inviting, ends with CTA
- Example: {"'Master essential Finnish greetings with our easy guide. Start speaking today!'" if content_type == 'learning' else "'Discover the magic of Finnish sauna culture. Read our guide now!'"}

### 3. URL SLUG
- 3-5 words, keyword-rich, hyphens

{content_structure}

### 5. SEO CONTENT RULES
- Include primary keyword in: H1, first paragraph, meaningful subheadings
- Use **proper H2/H3 headings**
- **MANDATORY**: Include 2-3 real, functioning links to authoritative sources (YLE, Visit Finland, Finnish language resources, etc.) within the text or in a "References" section.
- Add "Related Topics" section

### 6. TAGS
- 5-7 tags: topic, {"'Learn Finnish', 'Finnish Language'" if content_type == 'learning' else "'Finnish Culture', 'Visit Finland'"}, specific category

### 7. IMAGE PROMPT (for header image)
- Warm, inviting illustration in flat-vector style
- Show {"the learning concept visually (e.g. flashcards, conversation scene, classroom)" if content_type == 'learning' else "the cultural aspect (e.g. sauna, food, landscape)"}
- "No text in image"

## Output Format

Provide your response in this EXACT format:

---TITLE---
[Max 60 chars title]

---SLUG---
[slug-here]

---DESCRIPTION---
[~105 chars meta description]

---TAGS---
[tag1, tag2, tag3]

---IMAGE_PROMPT---
[Visual description for header image]

---IMAGE_ALT---
[Alt text with keyword]

---CONTENT---
[Full blog post with ## headings AND [IMAGE:description] markers at 2-3 strategic places]

---END---
"""

    try:
        response = client.models.generate_content(
            model=TEXT_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                tools=[types.Tool(google_search=types.GoogleSearch())]
            )
        )
    except ClientError as e:
        if e.code == 429:
            print("⚠️ Rate limit hit with Google Search grounding. Falling back to standard generation without search...")
            response = client.models.generate_content(
                model=TEXT_MODEL,
                contents=prompt
            )
        else:
            raise
            
    text = response.text
    
    # Parse the response
    def extract_section(text: str, section: str) -> str:
        pattern = rf'---{section}---\s*(.*?)(?=---[A-Z_]+---|---END---|$)'
        match = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
        return match.group(1).strip() if match else ""
    
    title = extract_section(text, "TITLE")
    slug = extract_section(text, "SLUG")
    description = extract_section(text, "DESCRIPTION")
    tags_raw = extract_section(text, "TAGS")
    image_prompt = extract_section(text, "IMAGE_PROMPT")
    image_alt = extract_section(text, "IMAGE_ALT")
    content = extract_section(text, "CONTENT")
    
    # Parse tags
    tags = [tag.strip().strip('"\'') for tag in tags_raw.split(',') if tag.strip()]
    
    # Clean up slug
    if not slug:
        slug = re.sub(r'[^a-z0-9]+', '-', topic.lower()).strip('-')
    
    # Default image alt if not provided
    if not image_alt:
        image_alt = f"Illustration for learning {topic} in Finnish"
    
    return {
        "title": title or topic,
        "slug": slug,
        "description": description,
        "tags": tags,
        "image_prompt": image_prompt,
        "image_alt": image_alt,
        "content": content,
        "level": level,
        "category": category,
        "date": date
    }


if __name__ == "__main__":
    # Test blog generation
    from .topic_manager import TopicManager
    
    tm = TopicManager()
    
    print("Suggesting topic...")
    suggestion = generate_topic_suggestion(tm)
    print(f"Topic: {suggestion['topic']}")
    print(f"Category: {suggestion['category']}")
    print(f"Brief: {suggestion['brief']}")
    
    print("\nGenerating blog post...")
    post = generate_blog_post(
        topic=suggestion['topic'],
        date="2026-01-14",
        category=suggestion['category']
    )
    
    print(f"\nTitle: {post['title']}")
    print(f"Description: {post['description']}")
    print(f"Tags: {post['tags']}")
    print(f"\nContent preview:\n{post['content'][:500]}...")
