    let STORAGE_KEY='todo_variant_tasks_v1';
    let tasks=[];
    let editingId=null;

    let f=document.getElementById('taskForm');
    let title=document.getElementById('title');
    let start=document.getElementById('startDate');
    let end=document.getElementById('endDate');
    let resp=document.getElementById('responsible');
    let prio=document.getElementById('priority');
    let notes=document.getElementById('notes');
    let done=document.getElementById('done');
    let list=document.getElementById('tasksList');
    let search=document.getElementById('searchBox');
    let info=document.getElementById('countsInfo');
    let progress=document.getElementById('progressBar');
    let clearDone=document.getElementById('clearDoneBtn');
    let saveAll=document.getElementById('saveAllBtn');
    let loadAll=document.getElementById('loadAllBtn');
    let clearStorage=document.getElementById('clearStorageBtn');
    let filterAll=document.getElementById('filterAll');
    let filterTodo=document.getElementById('filterTodo');
    let filterDone=document.getElementById('filterDone');
    let reset=document.getElementById('resetBtn');
    let pvTitle=document.getElementById('pvTitle');
    let pvMeta=document.getElementById('pvMeta');
    let pvNotes=document.getElementById('pvNotes');
    let previewCard=document.getElementById('previewCard');
    let previewEmpty=document.getElementById('previewEmpty');

    function saveStorage(){localStorage.setItem(STORAGE_KEY,JSON.stringify(tasks));}
    function loadStorage(){let raw=localStorage.getItem(STORAGE_KEY);if(raw){tasks=JSON.parse(raw);render();}}
    function clearAll(){localStorage.removeItem(STORAGE_KEY);tasks=[];render();}
    function genId(){return 't'+Date.now()+Math.floor(Math.random()*999);}
    function escapeHtml(str){return str.replace(/[&<>'"]/g,t=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[t]));}
    function render(){
      list.innerHTML='';let total=tasks.length;let doneCount=0;
      let q=search.value.toLowerCase();
      let filter=filterDone.checked?'done':(filterTodo.checked?'todo':'all');
      tasks.forEach(t=>{if(t.done)doneCount++;});
      tasks.forEach(t=>{
        let match=(filter==='all')||(filter==='done'&&t.done)||(filter==='todo'&&!t.done);
        let s=!q||(t.title.toLowerCase().includes(q)||(t.responsible||'').toLowerCase().includes(q)||(t.notes||'').toLowerCase().includes(q));
        if(!match||!s)return;
        let d=document.createElement('div');d.className='list-group-item mb-2 '+(t.priority==='High'?'priority-high':t.priority==='Low'?'priority-low':'priority-medium');
        d.innerHTML='<div><div class="d-flex justify-content-between"><h5>'+escapeHtml(t.title)+'</h5><span class="badge '+(t.done?'bg-success':'bg-warning text-dark')+'">'+(t.done?'Feita':'A fazer')+'</span></div><p class="small text-muted mb-1">'+(t.responsible?'Resp: '+escapeHtml(t.responsible)+' · ':'')+(t.startDate?'Início: '+t.startDate+' · ':'')+(t.endDate?'Fim: '+t.endDate+' · ':'')+'Prioridade: '+t.priority+'</p><p class="notes mb-2">'+escapeHtml(t.notes||'')+'</p><div class="d-flex gap-2"><button class="btn btn-sm btn-outline-primary">Editar</button><button class="btn btn-sm '+(t.done?'btn-outline-secondary':'btn-success')+'">'+(t.done?'Desfazer':'Concluir')+'</button><button class="btn btn-sm btn-danger">Excluir</button></div></div>';
        let b=d.querySelectorAll('button');
        b[0].onclick=()=>{editingId=t.id;title.value=t.title;start.value=t.startDate;end.value=t.endDate;resp.value=t.responsible;prio.value=t.priority;notes.value=t.notes;done.checked=t.done;updatePreview();};
        b[1].onclick=()=>{t.done=!t.done;saveStorage();render();};
        b[2].onclick=()=>{tasks=tasks.filter(x=>x.id!==t.id);saveStorage();render();};
        list.appendChild(d);
      });
      let p=total?Math.round(doneCount/total*100):0;progress.style.width=p+'%';progress.textContent=p+'%';info.textContent='Total: '+total+' • Concluídas: '+doneCount;
    }
    function updatePreview(){
      let titleTxt=title.value.trim();let meta=(resp.value?resp.value+' · ':'')+(prio.value?prio.value:'');
      if(!titleTxt){previewEmpty.classList.remove('d-none');previewCard.classList.add('d-none');return;}
      pvTitle.textContent=titleTxt;pvMeta.textContent=meta;pvNotes.textContent=notes.value;previewEmpty.classList.add('d-none');previewCard.classList.remove('d-none');
    }
    f.addEventListener('submit',e=>{
      e.preventDefault();
      if(!title.value.trim())return;
      if(editingId){let t=tasks.find(x=>x.id===editingId);if(t){t.title=title.value;t.startDate=start.value;t.endDate=end.value;t.responsible=resp.value;t.priority=prio.value;t.notes=notes.value;t.done=done.checked;}}
      else{tasks.push({id:genId(),title:title.value.trim(),startDate:start.value,endDate:end.value,responsible:resp.value.trim(),priority:prio.value,notes:notes.value.trim(),done:done.checked});}
      saveStorage();render();f.reset();editingId=null;updatePreview();
    });
    reset.onclick=()=>{f.reset();editingId=null;updatePreview();};
    search.oninput=render;filterAll.onchange=render;filterTodo.onchange=render;filterDone.onchange=render;
    clearDone.onclick=()=>{tasks=tasks.filter(t=>!t.done);saveStorage();render();};
    saveAll.onclick=saveStorage;loadAll.onclick=loadStorage;clearStorage.onclick=clearAll;
    title.oninput=updatePreview;resp.oninput=updatePreview;prio.onchange=updatePreview;notes.oninput=updatePreview;
    loadStorage();
