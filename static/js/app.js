// static/js/app.js

// 💡 宣告全域任務計數器
let taskCounter = 3; 

function showPreview() {
    const input = document.getElementById('commandInput');
    if (!input.value.trim()) {
        alert("請先輸入指令！");
        return;
    }
    
    // 1. 顯示預覽確認框並強制指定為上下排列
    const previewBox = document.getElementById('previewBox');
    previewBox.style.display = 'flex';
    previewBox.style.flexDirection = 'column'; 
    
    // 2. 鎖定文字輸入框與解析按鈕，避免確認期間被更動
    input.disabled = true;
    document.getElementById('parseBtn').disabled = true;
    input.style.opacity = '0.6'; 
}

function modifyCommand() {
    // 1. 隱藏預覽確認框
    document.getElementById('previewBox').style.display = 'none';
    
    // 2. 解鎖文字輸入框與解析按鈕
    const input = document.getElementById('commandInput');
    input.disabled = false;
    document.getElementById('parseBtn').disabled = false;
    input.style.opacity = '1';
    
    // 3. 自動把游標焦點放回輸入框，方便直接打字
    input.focus();
}

function confirmCommand() {
    const input = document.getElementById('commandInput');
    const commandText = input.value.trim();
    
    if (!commandText) return;

    // 1. 擷取解析預覽區塊中的結構化文字
    const scriptRows = document.querySelectorAll('#previewBox .script-row');
    let parsedResultArray = [];
    
    scriptRows.forEach(row => {
        const obj = row.querySelector('.object').innerText;
        const arrow = row.querySelector('.arrow').innerText;
        const target = row.querySelector('.target').innerText;
        // 將每一列組合為字串，例如："A 針筒 ➔ 1 號箱子"
        parsedResultArray.push(`${obj} ${arrow} ${target}`);
    });
    
    // 2. 將多個動作以逗號連接
    const finalParsedText = parsedResultArray.join('，');

    // 3. 抓取左側的任務佇列容器
    const queueList = document.querySelector('.queue-list');
    
    if (queueList) {
        // 產生動態任務編號
        const taskIdStr = '任務 #' + String(taskCounter).padStart(3, '0');
        
        // 建立新任務節點
        const newQueueItem = document.createElement('div');
        newQueueItem.className = 'queue-item status-muted'; 
        
        // 將 finalParsedText (解析後的文字) 寫入 HTML
        newQueueItem.innerHTML = `
            <div class="item-header">
                <span class="task-id">${taskIdStr}</span>
                <span class="badge badge-muted">排隊中</span>
            </div>
            <div class="item-content">
                <p class="parsed-text"><strong>[批次]</strong> ${finalParsedText}</p>
            </div>
        `;
        
        queueList.appendChild(newQueueItem);
        taskCounter++;
    }

    // 4. 恢復初始輸入狀態
    document.getElementById('previewBox').style.display = 'none';
    input.disabled = false;
    document.getElementById('parseBtn').disabled = false;
    input.style.opacity = '1';
    input.value = ''; 
}