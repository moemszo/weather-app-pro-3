import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 名前が入力されていない場合のバリデーション
    if (!formData.name || formData.name.trim() === '') {
      setSubmitStatus({ type: 'error', message: '名前を入力してください。' });
      return;
    }

    // メールアドレスが入力されていない場合のバリデーション
    if (!formData.email || formData.email.trim() === '') {
      setSubmitStatus({ type: 'error', message: '死ね' });
      return;
    }

    // メッセージが入力されていない場合のバリデーション
    if (!formData.message || formData.message.trim() === '') {
      setSubmitStatus({ type: 'error', message: 'メッセージを入力してください。' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.name,
          body: `Email: ${formData.email}\nMessage: ${formData.message}`,
          userId: 1
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSubmitStatus({ type: 'success', message: 'お問い合わせを送信しました！' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: '送信に失敗しました。もう一度お試しください。' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'エラーが発生しました。もう一度お試しください。' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">お問い合わせフォーム</h1>
      </header>
      <main className="App-main">
        <div className="contact-card">
          <h2 className="greeting">こんにちは</h2>
          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="form-textarea"
              />
            </div>
            {submitStatus && (
              <div className={`submit-status ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? '送信中...' : '送信'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
