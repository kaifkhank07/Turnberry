/* Turnberry HOA — shared behaviour: sticky header, mobile menu, scroll reveal */

(function(){
  var head=document.getElementById('head'),
      burger=document.getElementById('burger'),
      nav=document.getElementById('nav');

  function onScroll(){ head.classList.toggle('solid', window.scrollY>40); }
  onScroll();
  window.addEventListener('scroll',onScroll,{passive:true});

  burger.addEventListener('click',function(){
    var open=nav.classList.toggle('open');
    burger.setAttribute('aria-expanded',open?'true':'false');
    burger.textContent=open?'Close':'Menu';
  });
  nav.addEventListener('click',function(e){
    if(e.target.closest('a')){
      nav.classList.remove('open');
      burger.textContent='Menu';
      burger.setAttribute('aria-expanded','false');
    }
  });

  var items=document.querySelectorAll('.rise');
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)){
    Array.prototype.forEach.call(items,function(el){el.classList.add('in');});
  }else{
    var io=new IntersectionObserver(function(en){
      en.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
    },{threshold:.1,rootMargin:'0px 0px -50px'});
    Array.prototype.forEach.call(items,function(el){io.observe(el);});
  }
})();


/* ---------- contact form: validation + arithmetic verification ---------- */
(function(){
  // EmailJS Configuration - Replace these placeholders with your actual credentials
  var EMAILJS_CONFIG = {
    PUBLIC_KEY: 'THNMHOge9PjVEDsUy',
    SERVICE_ID: 'service_trmuo0a',
    TEMPLATE_ID: 'template_wkyc1cc'
  };

  // Initialize EmailJS SDK if available
  if (typeof emailjs !== 'undefined') {
    emailjs.init({
      publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
    });
  }

  var form = document.getElementById('contactForm');
  if(!form) return;

  var a = Math.floor(Math.random()*8)+2,
      b = Math.floor(Math.random()*8)+2,
      sumEl = document.getElementById('verifySum'),
      msg = document.getElementById('formMsg');
  if(sumEl) sumEl.textContent = a + ' + ' + b + ' =';

  function fail(el, text){
    el.setAttribute('aria-invalid','true');
    var e = el.parentNode.querySelector('.err');
    if(e) e.textContent = text;
    return false;
  }
  function clear(el){
    el.removeAttribute('aria-invalid');
    var e = el.parentNode.querySelector('.err');
    if(e) e.textContent = '';
  }

  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    var ok = true;
    ['name','email','subject','message','verify'].forEach(function(id){
      var el = form.elements[id];
      if(el) clear(el);
    });

    var n = form.elements['name'];
    if(!n.value.trim()) ok = fail(n,'Please enter your name.');

    var em = form.elements['email'];
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em.value.trim())) ok = fail(em,'Please enter a valid email address.');

    var s = form.elements['subject'];
    if(!s.value) ok = fail(s,'Please choose a subject.');

    var m = form.elements['message'];
    if(m.value.trim().length < 10) ok = fail(m,'Please write a little more so the Board can help.');

    var v = form.elements['verify'];
    if(parseInt(v.value,10) !== a + b) ok = fail(v,'That answer is not correct.');

    if(!ok) return;

    // Get the submit button and preserve original state
    var submitBtn = form.querySelector('button[type="submit"]');
    var originalBtnHtml = submitBtn.innerHTML;

    // Disable the button and show a sending state to prevent duplicate submissions
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Submit asynchronously using EmailJS
    (async function() {
      try {
        if (typeof emailjs === 'undefined') {
          throw new Error('EmailJS SDK not loaded. Please ensure the CDN script is included.');
        }

        await emailjs.sendForm(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          form
        );

        // Success Handling
        msg.textContent = 'Thanks! Your message has been successfully sent.';
        msg.style.borderLeftColor = 'var(--bronze)'; // success theme border color
        msg.classList.add('show');
        form.reset();

        // Regenerate math verification sum
        if(sumEl){
          a = Math.floor(Math.random()*8)+2; b = Math.floor(Math.random()*8)+2;
          sumEl.textContent = a + ' + ' + b + ' =';
        }
      } catch (error) {
        // Error Handling
        console.error('EmailJS Error:', error);
        
        var errorDetail = '';
        if (error && error.text) {
          errorDetail = ' (Detail: ' + error.text + ')';
        } else if (error && error.message) {
          errorDetail = ' (Detail: ' + error.message + ')';
        } else if (typeof error === 'string') {
          errorDetail = ' (Detail: ' + error + ')';
        }

        msg.textContent = 'Oops! Something went wrong while sending your message. Please try again later.' + errorDetail;
        msg.style.borderLeftColor = '#A03B25'; // error theme border color
        msg.classList.add('show');
      } finally {
        // Re-enable and restore button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    })();
  });

  var reset = document.getElementById('formReset');
  if(reset) reset.addEventListener('click', function(){
    form.reset();
    msg.classList.remove('show');
    ['name','email','subject','message','verify'].forEach(function(id){
      var el = form.elements[id]; if(el) clear(el);
    });
  });
})();
