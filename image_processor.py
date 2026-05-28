# image_processor.py
import os
from PIL import Image

def pop_up_image():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    img_path = os.path.join(base_dir, "cat.jpeg")
    
    # 如果本地沒有圖片，自動製造一張 400x400 的藍色圖片（這次換藍色試試看）
    if not os.path.exists(img_path):
        img = Image.new('RGB', (400, 400), color = 'blue')
        img.save(img_path)
    
    # 呼叫系統看圖軟體
    opened_img = Image.open(img_path)
    opened_img.show()
    
    return "已成功在主機上彈出圖片！"