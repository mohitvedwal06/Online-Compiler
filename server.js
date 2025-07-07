// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require('cors');
// const path = require('path');
// const compiler = require("compilex");
// const options = {stats: true};
// compiler.init(options);

// const app = express();
// const PORT = 8002;

// app.use(cors());
// app.use(bodyParser.json());

// // app.use(express.static(path.join(__dirname, 'public')));
// app.get("/", (req, res) => {
//     res.sendFile("C:/Users/Mohit Vedwal/Desktop/online_compiler/index.html");
// })

// app.post("/compile", (req, res) => {
//     const {code, input, language} = req.body;
//     try {
//         if(language == 'python') {
//             if(!input) {
//                 var envData = { OS : "windows", options: {timeout: 10000}}; 
//                 compiler.compilePython( envData , code , function(data){
//                     console.log("python---> ", data)
//                     res.send(data);
//                 });   
//             } else {
//                 var envData = { OS : "windows", options: {timeout: 10000}}; 
//                 compiler.compilePythonWithInput( envData , code , input ,  function(data){
//                     res.send(data);        
//                 });
//             }
//         } else if(language == 'c' || language == 'c++') {
//             if(!input) {
//                 var envData = { OS : "windows" , cmd : "g++", options: {timeout: 10000}};
//                 compiler.compileCPP(envData , code , function (data) {
//                     res.send(data);
//                 });
//             } else {
//                 var envData = { OS : "windows" , cmd : "g++", options: {timeout: 10000}};
//                 compiler.compileCPPWithInput(envData , code , input , function (data) {
//                     res.send(data);
//                 });
//             }
//         } else if(language == 'java') {
//             if(!input) {
//                 var envData = { OS : "windows", options: {timeout: 10000}}; 
//                 compiler.compileJava( envData , code , function(data){
//                     res.send(data);
//                 }); 
//             } else {
//                 var envData = { OS : "windows", options: {timeout: 10000}}; 
//                 compiler.compileJavaWithInput( envData , code , input ,  function(data){
//                     res.send(data);
//                 });
//             }
//         }
//     } catch (error) {
//         console.log('error', error)
//         res.status(409).json({success: false, message: error.message})
//     } 
// })

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require("express")
const app = express()
const bodyP = require("body-parser")
const cors = require('cors');
const compiler = require("compilex")
const options = { stats: true }
compiler.init(options)
app.use(cors());
app.use(bodyP.json())
const PORT = 8009;

app.use("/codemirror-5.65.9", express.static("C:/Users/Mohit Vedwal/Desktop/online_compiler/codemirror-5.65.16"))
app.get("/", function (req, res) {
    // compiler.flush(function () {
    //     console.log("deleted")
    // })
    res.sendFile("C:/Users/Mohit Vedwal/Desktop/online_compiler/compiler.html")
})
app.post("/compile", function (req, res) {
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    try {

        if (lang == "c" || lang == "c++") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
        else if (lang == "java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
            else {
                //if windows  
                var envData = { OS: "windows" };
                //else
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
        }
        else if (lang == "python") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
    }
    catch (e) {
        console.log("error")
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});