"""
AI Image Generator for blog post illustrations.
Uses Google Imagen API for image generation.
"""

import base64
from pathlib import Path
from typing import Optional, List, Dict, Tuple
from google import genai
from google.genai import types
from PIL import Image
import io
import re

from .config import GEMINI_API_KEY, IMAGE_MODEL, IMAGES_DIR, ILLUSTRATION_STYLE, IMAGE_ASPECT_RATIO


def get_client():
    """Get the Gemini client."""
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY not found. Please set it in your .env file.")
    return genai.Client(api_key=GEMINI_API_KEY)


def parse_image_markers(content: str) -> List[Dict[str, str]]:
    """
    Parse [IMAGE:description] markers from content.
    
    Args:
        content: The blog post content with image markers
    
    Returns:
        List of dicts with 'marker' (full match) and 'description' keys
    """
    pattern = r'\[IMAGE:([^\]]+)\]'
    matches = re.findall(pattern, content)
    
    markers = []
    for description in matches:
        markers.append({
            'marker': f'[IMAGE:{description}]',
            'description': description.strip()
        })
    
    return markers


def generate_image(
    prompt: str,
    filename: str,
    style: Optional[str] = None
) -> Optional[Path]:
    """
    Generate an image using Google Imagen API.
    
    Args:
        prompt: Description of the image to generate
        filename: Name for the output file (without extension)
        style: Art style to apply (defaults to ILLUSTRATION_STYLE from config)
    
    Returns:
        Path to the saved image, or None if generation failed
    """
    client = get_client()
    
    # Use global style if not specified
    if style is None:
        style = ILLUSTRATION_STYLE
    
    # Enhanced prompt for better results
    full_prompt = f"""{style}

Image description: {prompt}

Context: A scenic illustration for a blog about Finland.
CONSTRAINT: The image must be a PURE VISUAL SCENE. Do NOT include any text, grammar charts, vocabulary lists, or speech bubbles.
"""
    
    try:
        # Use Imagen API for image generation
        response = client.models.generate_images(
            model=IMAGE_MODEL,
            prompt=full_prompt,
            config=types.GenerateImagesConfig(
                number_of_images=1,
                aspect_ratio=IMAGE_ASPECT_RATIO
            )
        )
        
        # Extract image from response
        if response.generated_images:
            generated_image = response.generated_images[0]
            
            # Save the image
            output_path = IMAGES_DIR / f"{filename}.webp"
            
            # Get image bytes and save
            image_bytes = generated_image.image.image_bytes
            image = Image.open(io.BytesIO(image_bytes))
            image.save(output_path, "WEBP", quality=85, optimize=True)
            
            print(f"Image saved to: {output_path}")
            return output_path
        
        print("No image data in response")
        return None
        
    except Exception as e:
        print(f"Image generation failed: {e}")
        return None


def generate_blog_header_image(
    topic: str,
    date: str,
    custom_prompt: Optional[str] = None
) -> Optional[Path]:
    """
    Generate a header image for a blog post.
    
    Args:
        topic: The blog post topic
        date: The post date (used for filename)
        custom_prompt: Optional custom image description
    
    Returns:
        Path to the generated image
    """
    if custom_prompt:
        prompt = custom_prompt
    else:
        # Generate a default prompt based on topic
        prompt = f"""A warm, inviting illustration representing "{topic}" 
        for Finnish language learners. The scene should evoke Finland's 
        culture and lifestyle while being educational and approachable."""
    
    # Create filename from date and topic
    slug = re.sub(r'[^a-z0-9]+', '-', topic.lower()).strip('-')[:30]
    filename = f"{date}-header-{slug}"
    
    return generate_image(prompt, filename)


def generate_blog_images(
    markers: List[Dict[str, str]],
    date: str,
    slug: str
) -> Dict[str, Path]:
    """
    Generate images for all markers in a blog post.
    
    Args:
        markers: List of image markers from parse_image_markers()
        date: The post date (used for filename)
        slug: The post slug (used for filename)
    
    Returns:
        Dict mapping marker string to generated image path
    """
    image_mapping = {}
    
    for i, marker_info in enumerate(markers):
        marker = marker_info['marker']
        description = marker_info['description']
        
        print(f"Generating image {i+1}/{len(markers)}: {description[:50]}...")
        
        # Create unique filename for each image
        filename = f"{date}-{slug}-img{i+1}"
        
        image_path = generate_image(description, filename)
        
        if image_path:
            image_mapping[marker] = image_path
        else:
            print(f"  ⚠️ Failed to generate image for: {description[:50]}")
    
    return image_mapping


def replace_image_markers(
    content: str,
    image_mapping: Dict[str, Path]
) -> str:
    """
    Replace [IMAGE:description] markers with actual markdown image syntax.
    
    Args:
        content: The blog post content with image markers
        image_mapping: Dict mapping marker string to image path
    
    Returns:
        Content with markers replaced by markdown images
    """
    result = content
    
    for marker, image_path in image_mapping.items():
        # Extract description for alt text
        description_match = re.search(r'\[IMAGE:([^\]]+)\]', marker)
        alt_text = description_match.group(1).strip() if description_match else "Illustration"
        
        # Create markdown image with relative URL
        image_url = f"/images/{image_path.name}"
        markdown_image = f"![{alt_text}]({image_url})"
        
        result = result.replace(marker, markdown_image)
    
    return result


if __name__ == "__main__":
    # Test image generation
    print("Testing image generation with consistent style...")
    
    result = generate_blog_header_image(
        topic="Finnish Coffee Culture",
        date="2026-01-19",
        custom_prompt="A cozy Finnish café scene with people enjoying coffee and pulla (cardamom bread)"
    )
    
    if result:
        print(f"Success! Image saved to: {result}")
    else:
        print("Image generation failed")

