    const code = document.getElementById('code');
    const language = document.getElementById('language');
    const output = document.getElementById('output');
    const run = document.getElementById('runButton');

    var payload = {};
    run.addEventListener("click", async function (event) {
      event.preventDefault();
      debugger;
      payload = {
        code: code?.value,
        input: "",
        language: language?.value,
      }
      const response = await fetch('http://localhost:8000/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await response?.data;
      output.value = data?.output;
    })
    // const response = await fetch('http://localhost:8000/compile', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ code, language })
    // }); 

    // var data = await response.json();
    // output.value = data.output;
  
    // if (response.ok) {
    //   // const data = await response?.text();
    //   if (language === 'javascript') {
    //     const consoleLog = console.log;
    //     console.log = function(message) {
    //       outputDiv.innerText += message + '\n';
    //     };
    //     eval(code); // Execute the compiled JavaScript code
    //     console.log = consoleLog; // Restore console.log function
    //     outputDiv.innerText += '';
    //   } else {
    //     document.getElementById('output').innerText = code;
    //   }
    // } else {
    //   const errorMessage = await response.text();
    //   document.getElementById('output').innerText = `Error: ${errorMessage}`;
    // }
    
    // // Re-enable the button after the compilation process is complete
    // document.getElementById('runButton').disabled = false;
  // }
  