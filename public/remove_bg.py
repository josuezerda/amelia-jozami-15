from PIL import Image
import sys

def make_transparent_black(filepath):
    try:
        img = Image.open(filepath).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            brightness = sum(item[0:3]) / 3
            if brightness < 40:
                newData.append((255, 255, 255, 0))
            elif brightness < 120:
                opacity = int((brightness / 120) * 255)
                newData.append((item[0], item[1], item[2], opacity))
            else:
                newData.append(item)
                
        img.putdata(newData)
        img.save(filepath, "PNG")
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    make_transparent_black("/Users/josuezerda/Documents/Antigravity/Amelia Jozami/public/logo_3_es.png")
