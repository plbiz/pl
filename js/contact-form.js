function setSubject(name) {
    return name + " sent a message from your website"
}

document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('contact-form');
    const result = document.getElementById('form-result');
    const submitButton = document.getElementById('submitBtn')
    
    //on submit, POST to web3Forms and get response
    form.addEventListener('submit', function(e) {
      e.preventDefault();
    //   submitButton.disabled = 'true';  // todo: delete
      submitButton.setAttribute('disabled', 'true');

      const formData = new FormData(form);

      const senderName = formData.get("name")
      const subject = setSubject(senderName)
      formData.set('subject', subject)

      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      result.innerHTML = "Please wait..."
      //fetch result
      fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: json
          })
          .then(async (response) => {//show response
              let json = await response.json();
              console.log(json);
              if (response.status == 200) {
                  result.innerHTML = "Thank you for submitting your message! We'll get back to you shortly.";
                  result.classList.add("notice--success");
              } else {
                result.innerHTML = "Sorry, there was an issue sending your message."
                result.classList.add("notice--danger")
              }
          })
          .catch(error => {//show error
              console.log(error);
              result.innerHTML = "Uh oh. Something went wrong! Please try again later.";
              result.classList.add("notice--danger");
    
          })
          .then(function() {//reset form
              form.reset();
              submitButton.removeAttribute('disabled');

            //make response dissapear after 3 seconds
            //   setTimeout(() => {
            //     result.style.display = "none";
            //   }, 3000);
          });
    });
});