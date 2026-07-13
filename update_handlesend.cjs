const fs = require('fs');
let code = fs.readFileSync('src/components/YesilAiChatbot.tsx', 'utf8');

const targetStr = `  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build history for context
      const history = messages.filter(m => m.id !== '1').map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage.text, history })
      });

      if (!res.ok) throw new Error('API Error');

      const data = await res.json();
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.text,
        action: data.action
      };

      setMessages(prev => [...prev, botMessage]);

      // Execute action if present
      if (data.action) {
        const { type, payload, dataObj } = data.action;
        setTimeout(() => {
          if (type === 'NAVIGATE') onNavigate(payload);
          else if (type === 'FULLSCREEN') onFullscreen(payload === 'true');
          else if (type === 'THEME') onThemeChange(payload as any);
          else if (type === 'LOCK_SCREEN') onLockScreen();
          else if (type === 'DATA_ACTION' && onDataAction) {
            if (dataObj) {
              onDataAction(dataObj.actionName, dataObj.data);
            } else {
              try {
                const parsed = typeof payload === 'string' ? JSON.parse(payload) : payload;
                onDataAction(parsed.actionName, parsed.data);
              } catch (e) {
                console.error("Failed to parse DATA_ACTION payload", payload);
              }
            }
          }
        }, 800); // slight delay for better UX
      }

    } catch (err) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: 'Üzgünüm, şu anda bağlantı kuramıyorum. Lütfen daha sonra tekrar deneyin.' }]);
    } finally {
      setIsLoading(false);
    }
  };`;

const newStr = `  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: input.trim() };
    const botMessageId = (Date.now() + 1).toString();
    const initialBotMessage: ChatMessage = {
      id: botMessageId,
      role: 'model',
      text: '',
      steps: [{ id: 1, text: 'Talebiniz analiz ediliyor...', status: 'running' }]
    };

    setMessages(prev => [...prev, userMessage, initialBotMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.filter(m => m.id !== '1').map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage.text, history })
      });

      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      
      setMessages(prev => prev.map(m => m.id === botMessageId ? {
        ...m,
        steps: [
          { id: 1, text: 'Talep analiz edildi', status: 'success' },
          { id: 2, text: 'Aksiyonlar belirleniyor...', status: 'running' }
        ]
      } : m));

      await new Promise(resolve => setTimeout(resolve, 600));

      const actionStepText = data.action ? 'Sistem işlemleri uygulanıyor...' : 'Yanıt hazırlanıyor...';
      
      setMessages(prev => prev.map(m => m.id === botMessageId ? {
        ...m,
        steps: [
          { id: 1, text: 'Talep analiz edildi', status: 'success' },
          { id: 2, text: 'Aksiyonlar belirlendi', status: 'success' },
          { id: 3, text: actionStepText, status: 'running' }
        ]
      } : m));

      await new Promise(resolve => setTimeout(resolve, 800));

      setMessages(prev => prev.map(m => m.id === botMessageId ? {
        ...m,
        text: data.text,
        action: data.action,
        steps: [
          { id: 1, text: 'Talep analiz edildi', status: 'success' },
          { id: 2, text: 'Aksiyonlar belirlendi', status: 'success' },
          { id: 3, text: data.action ? 'Sistem işlemleri uygulandı' : 'Yanıt hazırlandı', status: 'success' }
        ]
      } : m));

      if (data.action) {
        const { type, payload, dataObj } = data.action;
        setTimeout(() => {
          if (type === 'NAVIGATE') onNavigate(payload);
          else if (type === 'FULLSCREEN') onFullscreen(payload === 'true');
          else if (type === 'THEME') onThemeChange(payload as any);
          else if (type === 'LOCK_SCREEN') onLockScreen();
          else if (type === 'DATA_ACTION' && onDataAction) {
            if (dataObj) {
              onDataAction(dataObj.actionName, dataObj.data);
            } else {
              try {
                const parsed = typeof payload === 'string' ? JSON.parse(payload) : payload;
                onDataAction(parsed.actionName, parsed.data);
              } catch (e) {
                console.error("Failed to parse DATA_ACTION payload", payload);
              }
            }
          }
        }, 500);
      }

    } catch (err) {
      setMessages(prev => prev.map(m => m.id === botMessageId ? {
        ...m,
        text: 'Üzgünüm, şu anda bağlantı kuramıyorum. Lütfen daha sonra tekrar deneyin.',
        steps: [
          { id: 1, text: 'Bağlantı hatası oluştu', status: 'error' }
        ]
      } : m));
    } finally {
      setIsLoading(false);
    }
  };`;

code = code.replace(targetStr, newStr);
fs.writeFileSync('src/components/YesilAiChatbot.tsx', code);
