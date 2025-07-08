// Chatbot Module
class ScalebleChatbot {
  constructor() {
    this.isOpen = false;
    this.isMinimized = false;
    this.currentStep = 0;
    this.userData = {};
    this.conversationHistory = [];
    this.typingTimeout = null;
    
    this.conversationFlow = [
      {
        id: 'welcome',
        type: 'bot',
        message: 'Hej! Jag är Scalebles AI-assistent. Jag hjälper företag att öka sin försäljning genom HubSpot och datadrivna processer. Vad kan jag hjälpa dig med idag?',
        quickReplies: [
          'Jag vill öka min försäljning',
          'Berätta om HubSpot',
          'Visa case studies',
          'Boka konsultation'
        ]
      },
      {
        id: 'sales_increase',
        type: 'bot',
        message: 'Fantastiskt! Vi hjälper företag att öka sin försäljning med i genomsnitt 300%. För att ge dig den bästa rådgivningen, berätta lite om ditt företag.',
        quickReplies: [
          'Vi är ett SaaS-företag',
          'Vi tillverkar produkter',
          'Vi är en konsultfirma',
          'Annat'
        ]
      },
      {
        id: 'company_size',
        type: 'bot',
        message: 'Perfekt! Hur många anställda har ni?',
        quickReplies: [
          '1-10 anställda',
          '11-50 anställda',
          '51-200 anställda',
          '200+ anställda'
        ]
      },
      {
        id: 'current_challenges',
        type: 'bot',
        message: 'Vilka är era största utmaningar inom försäljning just nu?',
        quickReplies: [
          'Svårt att hitta leads',
          'Låg konverteringsgrad',
          'Ineffektiva processer',
          'Saknar struktur'
        ]
      },
      {
        id: 'budget_range',
        type: 'bot',
        message: 'Vad har ni för budget för att förbättra er försäljning?',
        quickReplies: [
          'Under 50,000 SEK/månad',
          '50,000-200,000 SEK/månad',
          '200,000-500,000 SEK/månad',
          'Över 500,000 SEK/månad'
        ]
      },
      {
        id: 'contact_info',
        type: 'bot',
        message: 'Tack för informationen! Jag tror vi kan hjälpa er att öka er försäljning betydligt. Kan jag få ditt namn och e-postadress för att skicka dig en personlig analys?',
        type: 'form',
        fields: [
          { name: 'firstName', label: 'Förnamn', type: 'text', required: true },
          { name: 'email', label: 'E-postadress', type: 'email', required: true },
          { name: 'company', label: 'Företag', type: 'text', required: false }
        ]
      },
      {
        id: 'success',
        type: 'bot',
        message: 'Tack! Jag skickar dig en personlig analys inom 24 timmar. Vill du också boka en gratis konsultation med en av våra experter?',
        quickReplies: [
          'Ja, boka konsultation',
          'Nej, tack',
          'Visa fler resurser'
        ]
      }
    ];
  }

  init() {
    this.createChatbotHTML();
    this.bindEvents();
    this.startConversation();
  }

  createChatbotHTML() {
    const chatbotHTML = `
      <div class="chatbot-widget" id="chatbotWidget">
        <button class="chatbot-button" id="chatbotButton">
          <span class="chat-icon">💬</span>
          <div class="notification-badge" id="notificationBadge" style="display: none;">1</div>
        </button>
        
        <div class="chatbot-container" id="chatbotContainer">
          <div class="chatbot-header">
            <div class="header-info">
              <div class="bot-avatar">🤖</div>
              <div class="bot-info">
                <div class="bot-name">Scaleble AI</div>
                <div class="bot-status">
                  <div class="status-dot"></div>
                  Online
                </div>
              </div>
            </div>
            <div class="header-actions">
              <button class="header-btn" id="minimizeBtn">−</button>
              <button class="header-btn" id="closeBtn">×</button>
            </div>
          </div>
          
          <div class="chatbot-messages" id="chatbotMessages">
            <!-- Messages will be added here -->
          </div>
          
          <div class="chatbot-input" id="chatbotInput">
            <div class="input-container">
              <textarea class="input-field" id="messageInput" placeholder="Skriv ditt meddelande..." rows="1"></textarea>
              <button class="send-button" id="sendButton">➤</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }

  bindEvents() {
    const button = document.getElementById('chatbotButton');
    const container = document.getElementById('chatbotContainer');
    const closeBtn = document.getElementById('closeBtn');
    const minimizeBtn = document.getElementById('minimizeBtn');
    const sendBtn = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');

    // Toggle chatbot
    button.addEventListener('click', () => this.toggleChatbot());

    // Close chatbot
    closeBtn.addEventListener('click', () => this.closeChatbot());

    // Minimize chatbot
    minimizeBtn.addEventListener('click', () => this.minimizeChatbot());

    // Send message
    sendBtn.addEventListener('click', () => this.sendUserMessage());
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendUserMessage();
      }
    });

    // Auto-resize textarea
    messageInput.addEventListener('input', () => {
      messageInput.style.height = 'auto';
      messageInput.style.height = Math.min(messageInput.scrollHeight, 100) + 'px';
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target) && !button.contains(e.target) && this.isOpen) {
        this.closeChatbot();
      }
    });
  }

  startConversation() {
    // Show notification badge after 5 seconds
    setTimeout(() => {
      this.showNotification();
    }, 5000);
  }

  showNotification() {
    const badge = document.getElementById('notificationBadge');
    if (badge && !this.isOpen) {
      badge.style.display = 'flex';
    }
  }

  toggleChatbot() {
    if (this.isOpen) {
      this.closeChatbot();
    } else {
      this.openChatbot();
    }
  }

  openChatbot() {
    this.isOpen = true;
    this.isMinimized = false;
    
    const button = document.getElementById('chatbotButton');
    const container = document.getElementById('chatbotContainer');
    const badge = document.getElementById('notificationBadge');
    
    button.classList.add('active');
    container.classList.add('active');
    badge.style.display = 'none';

    // Start conversation if it's the first time
    if (this.conversationHistory.length === 0) {
      this.addBotMessage(this.conversationFlow[0]);
    }

    // Focus on input
    setTimeout(() => {
      const messageInput = document.getElementById('messageInput');
      if (messageInput) {
        messageInput.focus();
      }
    }, 300);
  }

  closeChatbot() {
    this.isOpen = false;
    this.isMinimized = false;
    
    const button = document.getElementById('chatbotButton');
    const container = document.getElementById('chatbotContainer');
    
    button.classList.remove('active');
    container.classList.remove('active');
  }

  minimizeChatbot() {
    this.isMinimized = true;
    const container = document.getElementById('chatbotContainer');
    container.classList.add('minimized');
  }

  addBotMessage(step) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    
    let messageHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <div class="message-text">${step.message}</div>
        <div class="message-time">${this.getCurrentTime()}</div>
      </div>
    `;

    // Add quick replies if available
    if (step.quickReplies) {
      messageHTML += `
        <div class="quick-replies">
          ${step.quickReplies.map(reply => 
            `<div class="quick-reply" data-reply="${reply}">${reply}</div>`
          ).join('')}
        </div>
      `;
    }

    // Add form if it's a form step
    if (step.type === 'form' && step.fields) {
      messageHTML += `
        <div class="chatbot-lead-form">
          <div class="form-title">Fyll i dina uppgifter</div>
          ${step.fields.map(field => `
            <div class="form-group">
              <label class="form-label">${field.label}</label>
              <input class="form-input" type="${field.type}" name="${field.name}" ${field.required ? 'required' : ''}>
            </div>
          `).join('')}
          <div class="form-actions">
            <button class="btn btn-primary" id="submitForm">Skicka</button>
            <button class="btn btn-secondary" id="skipForm">Hoppa över</button>
          </div>
        </div>
      `;
    }

    messageDiv.innerHTML = messageHTML;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Bind quick reply events
    if (step.quickReplies) {
      setTimeout(() => {
        const quickReplies = messageDiv.querySelectorAll('.quick-reply');
        quickReplies.forEach(reply => {
          reply.addEventListener('click', () => {
            this.handleQuickReply(reply.textContent);
          });
        });
      }, 100);
    }

    // Bind form events
    if (step.type === 'form') {
      setTimeout(() => {
        const submitBtn = messageDiv.querySelector('#submitForm');
        const skipBtn = messageDiv.querySelector('#skipForm');
        
        if (submitBtn) {
          submitBtn.addEventListener('click', () => this.handleFormSubmit(messageDiv));
        }
        if (skipBtn) {
          skipBtn.addEventListener('click', () => this.handleFormSkip());
        }
      }, 100);
    }

    this.conversationHistory.push({
      type: 'bot',
      message: step.message,
      timestamp: new Date()
    });
  }

  addUserMessage(message) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    
    messageDiv.innerHTML = `
      <div class="message-avatar">👤</div>
      <div class="message-content">
        <div class="message-text">${message}</div>
        <div class="message-time">${this.getCurrentTime()}</div>
      </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    this.conversationHistory.push({
      type: 'user',
      message: message,
      timestamp: new Date()
    });
  }

  addTypingIndicator() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <div class="typing-dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    `;

    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  sendUserMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message) return;

    this.addUserMessage(message);
    messageInput.value = '';
    messageInput.style.height = 'auto';

    // Process user message
    this.processUserMessage(message);
  }

  handleQuickReply(reply) {
    this.addUserMessage(reply);
    this.processUserMessage(reply);
  }

  handleFormSubmit(formDiv) {
    const formInputs = formDiv.querySelectorAll('.form-input');
    const formData = {};
    let isValid = true;

    formInputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        input.classList.add('error');
        isValid = false;
      } else {
        input.classList.remove('error');
        formData[input.name] = input.value.trim();
      }
    });

    if (!isValid) return;

    // Store user data
    Object.assign(this.userData, formData);

    // Remove form
    const form = formDiv.querySelector('.chatbot-lead-form');
    if (form) {
      form.remove();
    }

    // Show success message
    this.addBotMessage({
      id: 'success',
      type: 'bot',
      message: `Tack ${formData.firstName}! Jag skickar dig en personlig analys inom 24 timmar. Vill du också boka en gratis konsultation med en av våra experter?`,
      quickReplies: [
        'Ja, boka konsultation',
        'Nej, tack',
        'Visa fler resurser'
      ]
    });

    // Send data to server (in real implementation)
    this.sendLeadData(formData);
  }

  handleFormSkip() {
    this.addBotMessage({
      id: 'skip_success',
      type: 'bot',
      message: 'Inga problem! Du kan alltid komma tillbaka senare. Vill du se några av våra resurser eller case studies?',
      quickReplies: [
        'Visa case studies',
        'Ladda ner ROI-kalkylator',
        'Boka konsultation',
        'Tack, det räcker'
      ]
    });
  }

  processUserMessage(message) {
    // Add typing indicator
    this.addTypingIndicator();

    // Simulate processing time
    setTimeout(() => {
      this.removeTypingIndicator();
      
      // Simple keyword-based response system
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('försäljning') || lowerMessage.includes('öka')) {
        this.currentStep = 1;
        this.addBotMessage(this.conversationFlow[1]);
      } else if (lowerMessage.includes('hubspot')) {
        this.addBotMessage({
          id: 'hubspot_info',
          type: 'bot',
          message: 'HubSpot är världens ledande plattform för inbound marketing och sales. Vi hjälper företag att implementera och optimera HubSpot för maximal försäljning. Vill du veta mer om våra HubSpot-tjänster?',
          quickReplies: [
            'Ja, berätta mer',
            'Visa case studies',
            'Boka demo',
            'Nej, tack'
          ]
        });
      } else if (lowerMessage.includes('case') || lowerMessage.includes('exempel')) {
        this.addBotMessage({
          id: 'case_studies',
          type: 'bot',
          message: 'Vi har hjälpt över 100 företag att öka sin försäljning med i genomsnitt 300%. Vill du se några specifika exempel?',
          quickReplies: [
            'SaaS-företag',
            'Tillverkningsföretag',
            'FinTech-företag',
            'Alla case studies'
          ]
        });
      } else if (lowerMessage.includes('boka') || lowerMessage.includes('konsultation')) {
        this.addBotMessage({
          id: 'booking',
          type: 'bot',
          message: 'Perfekt! Jag hjälper dig boka en gratis konsultation. Kan jag få ditt namn och e-postadress?',
          type: 'form',
          fields: [
            { name: 'firstName', label: 'Förnamn', type: 'text', required: true },
            { name: 'email', label: 'E-postadress', type: 'email', required: true },
            { name: 'company', label: 'Företag', type: 'text', required: false }
          ]
        });
      } else {
        // Default response
        this.addBotMessage({
          id: 'default',
          type: 'bot',
          message: 'Jag förstår! Låt mig hjälpa dig hitta rätt information. Vad är du mest intresserad av?',
          quickReplies: [
            'Öka försäljning',
            'HubSpot implementation',
            'Case studies',
            'Boka konsultation'
          ]
        });
      }
    }, 1500);
  }

  sendLeadData(data) {
    // In a real implementation, this would send data to your CRM or email system
    console.log('Lead data:', data);
    
    // Example: Send to HubSpot or your backend
    fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        source: 'chatbot',
        timestamp: new Date().toISOString()
      })
    }).catch(error => {
      console.log('Error sending lead data:', error);
    });
  }

  getCurrentTime() {
    return new Date().toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const chatbot = new ScalebleChatbot();
  chatbot.init();
  
  // Make chatbot globally available
  window.scalebleChatbot = chatbot;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScalebleChatbot;
} 