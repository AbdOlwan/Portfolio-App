<script setup>
import { ref, computed } from 'vue';
import { useContactStore } from '@/stores/contactStore'; //

const contactStore = useContactStore();

// Form State matching ContactMessageCreateDto
const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

// Validation State
const errors = ref({});
const isTouched = ref({
  name: false,
  email: false,
  subject: false,
  message: false
});

// Validate individual field
const validateField = (field) => {
  isTouched.value[field] = true;
  errors.value[field] = '';

  if (field === 'name' && !form.value.name.trim()) {
    errors.value.name = 'Name is required.';
  }
  if (field === 'email') {
    if (!form.value.email.trim()) {
      errors.value.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
      errors.value.email = 'Invalid email address.';
    }
  }
  if (field === 'subject' && !form.value.subject.trim()) {
    errors.value.subject = 'Subject is required.';
  }
  if (field === 'message' && !form.value.message.trim()) {
    errors.value.message = 'Message is required.';
  }
};

// Check if form is valid
const isValid = computed(() => {
  return form.value.name &&
         form.value.email &&
         !errors.value.email &&
         form.value.subject &&
         form.value.message;
});

// Submit Handler
const handleSubmit = async () => {
  // Validate all
  ['name', 'email', 'subject', 'message'].forEach(f => validateField(f));

  if (Object.values(errors.value).some(e => e)) return;

  const success = await contactStore.submitContactForm(form.value); //

  if (success) {
    // Clear form on success
    form.value = { name: '', email: '', phone: '', subject: '', message: '' };
    isTouched.value = { name: false, email: false, subject: false, message: false };

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      contactStore.clearStatus();
    }, 5000);
  }
};
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="container">

      <div class="section-header">
        <h2 class="section-title">Get in <span class="highlight">Touch</span></h2>
        <p class="section-subtitle">
          Open for new opportunities, collaborations, or technical consultations.
        </p>
      </div>

      <div class="contact-wrapper">

        <div class="contact-info-panel">
          <div class="info-header">
            <h3 class="panel-title">Contact Information</h3>
            <p class="panel-desc">
              Feel free to reach out through the form or via direct channels.
            </p>
          </div>

          <div class="info-grid">
            <div class="info-item">
              <div class="icon-box">📧</div>
              <div class="info-content">
                <span class="label">Email</span>
                <a href="mailto:hello@example.com" class="value link">hello@example.com</a>
              </div>
            </div>

            <div class="info-item">
              <div class="icon-box">📍</div>
              <div class="info-content">
                <span class="label">Location</span>
                <span class="value">Cairo, Egypt (Open to Relocation)</span>
              </div>
            </div>

            <div class="info-item">
              <div class="icon-box">💼</div>
              <div class="info-content">
                <span class="label">Availability</span>
                <span class="value status-available">
                  <span class="status-dot"></span> Open for Work
                </span>
              </div>
            </div>
          </div>

          <div class="code-decoration">
            <pre><code><span class="kw">const</span> <span class="var">initiateConnection</span> = <span class="kw">async</span> () => {
  <span class="kw">await</span> <span class="func">connect</span>(<span class="str">'You'</span>, <span class="str">'Me'</span>);
  <span class="kw">return</span> <span class="str">'Great Success'</span>;
};</code></pre>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="contact-form">

          <div v-if="contactStore.successMessage" class="status-message success">
            <span class="icon">✅</span> {{ contactStore.successMessage }}
          </div>

          <div v-if="contactStore.error" class="status-message error">
            <span class="icon">⚠️</span> {{ contactStore.error }}
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="name">Full Name <span class="req">*</span></label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="John Doe"
                :class="{ 'error-border': errors.name }"
                @blur="validateField('name')"
              />
              <span class="error-text" v-if="errors.name">{{ errors.name }}</span>
            </div>

            <div class="form-group">
              <label for="email">Email Address <span class="req">*</span></label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="john@company.com"
                :class="{ 'error-border': errors.email }"
                @blur="validateField('email')"
              />
              <span class="error-text" v-if="errors.email">{{ errors.email }}</span>
            </div>

            <div class="form-group">
              <label for="phone">Phone (Optional)</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div class="form-group">
              <label for="subject">Subject <span class="req">*</span></label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                placeholder="Project Inquiry / Hiring"
                :class="{ 'error-border': errors.subject }"
                @blur="validateField('subject')"
              />
              <span class="error-text" v-if="errors.subject">{{ errors.subject }}</span>
            </div>

            <div class="form-group full-width">
              <label for="message">Message <span class="req">*</span></label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                placeholder="Tell me about your project or inquiry..."
                :class="{ 'error-border': errors.message }"
                @blur="validateField('message')"
              ></textarea>
              <span class="error-text" v-if="errors.message">{{ errors.message }}</span>
            </div>
          </div>

          <div class="form-actions">
            <button
              type="submit"
              class="submit-btn"
              :disabled="contactStore.isLoading || !isValid"
            >
              <span v-if="contactStore.isLoading" class="btn-loader"></span>
              <span v-else>Send Message</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* --- 1. Global Variables (Design System) --- */
:root {
  --bg-dark: #0f172a;
  --card-bg: #1e293b;
  --input-bg: #0f172a;
  --border-color: #334155;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --primary-blue: #2563eb;
  --success-green: #10b981;
  --error-red: #ef4444;
}

/* --- 2. Section Layout --- */
.contact-section {
  background-color: #0f172a;
  padding: 5rem 1.5rem;
  color: #f8fafc;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

/* Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.highlight {
  color: #2563eb;
}

.section-subtitle {
  color: #94a3b8;
  font-size: 1.1rem;
}

/* --- 3. Main Wrapper (Split Layout) --- */
.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  align-items: stretch;
}

/* --- 4. Left Panel (Info) --- */
.contact-info-panel {
  background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.panel-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.panel-desc {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.icon-box {
  width: 40px;
  height: 40px;
  background-color: rgba(37, 99, 235, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.value {
  font-size: 1rem;
  color: #e2e8f0;
  font-weight: 500;
}

.value.link {
  color: #60a5fa;
  text-decoration: none;
  transition: color 0.2s;
}
.value.link:hover { color: #93c5fd; }

.status-available {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #10b981;
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
  animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

/* Decorative Code Block */
.code-decoration {
  margin-top: 3rem;
  background-color: #0b1120;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #1e293b;
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  overflow: hidden;
  opacity: 0.7;
}
.kw { color: #c678dd; } /* purple */
.func { color: #61afef; } /* blue */
.str { color: #98c379; } /* green */
.var { color: #e5c07b; } /* yellow */

/* --- 5. Right Side (Form) --- */
.contact-form {
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 2.5rem;
}

.status-message {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.status-message.success {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.2);
}
.status-message.error {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #cbd5e1;
}
.req { color: #ef4444; }

input, textarea {
  background-color: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  color: #f8fafc;
  font-family: inherit;
  transition: all 0.3s ease;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

input.error-border, textarea.error-border {
  border-color: #ef4444;
}

.error-text {
  font-size: 0.8rem;
  color: #ef4444;
}

/* Submit Button */
.form-actions {
  margin-top: 2rem;
  grid-column: 1 / -1;
}

.submit-btn {
  width: 100%;
  padding: 0.9rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn:hover:not(:disabled) {
  background-color: #1d4ed8;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background-color: #475569;
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-loader {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* --- 6. Responsive --- */
@media (max-width: 900px) {
  .contact-wrapper {
    grid-template-columns: 1fr;
  }

  .contact-info-panel {
    order: 2; /* Form first on mobile usually better for conversion, or keep 1 for info */
  }
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .section-title {
    font-size: 2rem;
  }
}
</style>
