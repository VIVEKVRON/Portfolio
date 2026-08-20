const fs = require('fs');
let code = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

const regex = /action=\{async \(formData\) => \{[\s\S]*?\}\}/;
const replacement = `onSubmit={async (e) => {
                       e.preventDefault();
                       const formData = new FormData(e.currentTarget);
                       try {
                         const res = await submitContactMessage(formData);
                         if (res.success) {
                           alert("Message sent securely to the database!");
                           (document.getElementById("contactForm") as HTMLFormElement).reset();
                         } else {
                           alert("Error sending message: " + res.error);
                         }
                       } catch (err) {
                         alert("Network Error. Please try again.");
                       }
                     }}`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/components/Portfolio.tsx', code);
console.log('done');
