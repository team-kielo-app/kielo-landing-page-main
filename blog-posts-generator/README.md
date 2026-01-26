# Blog Posts Generator

A Python CLI tool that generates daily MDX blog posts for Finnish language learners (A1-A2 level) using Gemini AI.

## Features

- 📚 Extracts content from Finnish textbooks (Suomen mestari 1, Suomi sujuvaksi 1)
- 🤖 AI-powered blog post generation with Gemini
- 🖼️ AI-generated illustrations for each post
- 📅 Daily scheduling with no duplicate dates
- 🎯 Intelligent topic tracking to avoid repetition
- 🔍 SEO-optimized MDX output

## Setup

1. **Create and activate virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure API key:**
   ```bash
   cp .env.example .env
   # Edit .env and add your Gemini API key
   ```

## Usage

Always ensure your virtual environment is activated first:
```bash
cd blog-posts-generator
source venv/bin/activate
```

### Generate a blog post for tomorrow
```bash
python3 main.py generate
```

### Generate for a specific date
```bash
python3 main.py generate --date 2026-01-15
```

### Generate multiple posts (next N days)
```bash
python3 main.py generate --days 7
```

### View topic history
```bash
python3 main.py topics --list
```

### Regenerate faulty images

**Interactive mode** - list all images and select which to regenerate:
```bash
python3 main.py regenerate-image --list
```

**Single file mode** - regenerate a specific image:
```bash
python3 main.py regenerate-image --file 2026-01-26-linnanmaki-img1.webp
```

The command extracts the original prompt from the MDX file's alt text and regenerates the image.

## Output

Blog posts are generated directly into the main app's public directory:
```
../public/blogs/
├── 2026-01-14-finnish-greetings.mdx
└── images/
    ├── 2026-01-14-finnish-greetings.webp
    └── ...
```
