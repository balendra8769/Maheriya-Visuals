    function filterVideos(category, btn) {
      const cards = document.querySelectorAll('.video-card');
      const buttons = document.querySelectorAll('.tab-btn');

      buttons.forEach(button => button.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // ***WHATSAPPP*******
        const contactForm = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');

    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Collect form data
      const fullName = document.getElementById('fullname').value.trim();
      const email = document.getElementById('email').value.trim();
      const projectType = document.getElementById('projecttype').value;
      const vision = document.getElementById('vision').value.trim();

      // Validate form
      if (!fullName || !email || !projectType || !vision) {
        showMessage('Please fill all fields', 'error');
        return;
      }

      try {
        // Get project type label
        const projectTypeSelect = document.getElementById('projecttype');
        const projectTypeLabel = projectTypeSelect.options[projectTypeSelect.selectedIndex].text;

        // Create formatted message
        const message =
            `NEW PROJECT INQUIRY - MAHERIYA VISUALS
                 Full Name: ${fullName}
                 Email: ${email}
                 Project Type: ${projectTypeLabel}
                 Project Vision:${vision}
          -----Submitted via Contact Form------`;

        // 1. Send via WhatsApp
        const whatsappNumber = '9316102047';
        const whatsappMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${+919316102047}?text=${whatsappMessage}`;

        // 2. Send via Email (using FormSubmit.co - completely free)
        const formData = new FormData();
        formData.append('_captcha', 'false');
        formData.append('Full Name', fullName);
        formData.append('Email', email);
        formData.append('Project Type', projectTypeLabel);
        formData.append('Project Vision', vision);

        // Send email via FormSubmit
        const emailResponse = await fetch('https://formsubmit.co/maheriyaharshu@gmail.com', {
          method: 'POST',
          body: formData
        });

        if (emailResponse.ok) {
          // Show success message
          showMessage('✓ Message sent successfully! Opening WhatsApp...', 'success');

          // Reset form
          contactForm.reset();

          // Delay WhatsApp opening slightly
          setTimeout(() => {
            window.open(whatsappUrl, '_blank');
          }, 1000);
        } else {
          // Still open WhatsApp even if email fails
          showMessage('✓ Opening WhatsApp to continue...', 'success');
          setTimeout(() => {
            window.open(whatsappUrl, '_blank');
          }, 500);
        }

      } catch (error) {
        console.error('Error:', error);
        showMessage('Error sending message. Please try again.', 'error');
      }
    });

    function showMessage(text, type) {
      responseMessage.textContent = text;
      responseMessage.className = `response-message ${type}`;

      // Auto-hide error messages after 5 seconds
      if (type === 'error') {
        setTimeout(() => {
          responseMessage.className = 'response-message';
        }, 5000);
      }
    }