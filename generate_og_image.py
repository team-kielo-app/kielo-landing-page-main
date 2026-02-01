from PIL import Image, ImageDraw, ImageFont
import os

def create_optimized_og_image():
    input_path = "public/hero-image.png"
    output_path = "public/og-image-optimized.png"
    
    # Target dimensions
    TARGET_WIDTH = 1200
    TARGET_HEIGHT = 630
    
    try:
        img = Image.open(input_path)
        
        # 1. Resize/Crop to fill 1200x630
        img_ratio = img.width / img.height
        target_ratio = TARGET_WIDTH / TARGET_HEIGHT
        
        if img_ratio > target_ratio:
            # Image is wider than target -> scale by height
            new_height = TARGET_HEIGHT
            new_width = int(new_height * img_ratio)
        else:
            # Image is taller than target -> scale by width
            new_width = TARGET_WIDTH
            new_height = int(new_width / img_ratio)
            
        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Center crop
        left = (new_width - TARGET_WIDTH) / 2
        top = (new_height - TARGET_HEIGHT) / 2
        right = (new_width + TARGET_WIDTH) / 2
        bottom = (new_height + TARGET_HEIGHT) / 2
        
        img = img.crop((left, top, right, bottom))
        
        # 2. Add CTA
        draw = ImageDraw.Draw(img)
        
        # Draw a semi-transparent dark overlay at the bottom
        overlay = Image.new('RGBA', img.size, (0,0,0,0))
        draw_overlay = ImageDraw.Draw(overlay)
        # Gradient or solid bar? Let's do a subtle gradient or bar
        # Simple bar for robust "CTA"
        bar_height = 100
        draw_overlay.rectangle(
            [(0, TARGET_HEIGHT - bar_height), (TARGET_WIDTH, TARGET_HEIGHT)],
            fill=(0, 0, 0, 180)
        )
        
        img = Image.alpha_composite(img.convert('RGBA'), overlay)
        draw = ImageDraw.Draw(img)
        
        # Add text - trying to use a default font if custom not found
        # In this env, likely standard fonts available
        try:
            # Try to load a nice font, or default
            font_size = 40
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size, index=0) # Mac default
        except:
             try:
                 font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 40)
             except:
                 font = ImageFont.load_default()

        text = "Start Learning Finnish Today | Download Kielo"
        
        # Calculate text position
        try:
            # Pillow 10+
            left, top, right, bottom = draw.textbbox((0, 0), text, font=font)
            text_width = right - left
            text_height = bottom - top
        except AttributeError:
            # Older Pillow
            text_width, text_height = draw.textsize(text, font=font)
            
        x = (TARGET_WIDTH - text_width) / 2
        y = (TARGET_HEIGHT - bar_height) + (bar_height - text_height) / 2 - 5 # slight adjustment
        
        draw.text((x, y), text, fill="white", font=font)
        
        # Save
        img.save(output_path)
        print(f"Successfully created {output_path}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_optimized_og_image()
