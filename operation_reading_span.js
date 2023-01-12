'use strict';

// **** //
// VARIABILI //
// **** //

var vvv = 1; // var fondamentale, indica a che punto siamo nel test
var inputNum = new Array();  // array per l'inserimento in input dei numeri
var generatedNum = new Array();  // array per i numeri generati dal programma
var grade = 0; // int per indicare il punteggio dell'utente
var x = 0, y = 0; // int per scorrere gli arrays
var op = 0;  // var che indica a che punto dello span in corso siamo arrivati
var iterSpan = 2;  // var globale per definire quante volte iterare dentro un round di un test
var numcont = 0;  // contatore del numero da inserire in input
var ordineTra, ordineST;
var distance = 120000; // tempo relax
var checkST = 0;  // check del completamento degli ST; se arriva a 2 vuol dire che sia l'OST che l'RST sono stati completati
var combOST = [3,3,3,3];
var combRST = [3,3,3,3];

var RST1 = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var RST2 = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var RSTT = [1,1,1,1,1,1,1,1,1,1];

// SETTIMEOUT O SETINTERVAL
var tout;  // timeout per il ritorno a ControlloCentrale o alla funzione principale del momento
var tiet;  // timeout intraoperazione, OST E RST
var timeOutCatch;
var timeAtt1, timeAttG = 0, timeAttS = 0;
var timeAttLetters;
var timeAttBar;
var timeAttCheck;
var timeAttGuide;
var timeOutLight;
var timeClock;

// TRAINING
//var again = true; // destinata a ripetere o meno il training
var trainingFinito = false;
var trackOST = 0;
var trackTrack = 0;
var numTra = new Array();
var frTra = new Array();
var opTra = new Array();
var numTrak = 0, frTrak = 0, opTrak = 0;
var numberST = "63"; 
var totST = 0;  // usato in combo con contOST e contRST per valutare la pecentuale di successo nel compito di elaborazione dell'informazione
        
// OPERATION SPAN
var opMatch; // operation span, variabile di check
var OSTResult;
var contOST = 0, rightOST = 0;

// READING SPAN
var readMatch; // reading span, variabile di check
var RSTResult;
var contRST = 0, rightRST = 0;

// TRACCIAMENTO TABELLA CSV
var testIndex = 0;
var dsItemNumber = 0, dsPartialScore = 0, dsTotScore = 0;
var AttTotalStartTime, AttTotalEndTime;
var startTime, endTime, durationTime, durStartTime, durEndTime;

var nomeUtente = "";
var Guida = "Guida";
var Lettere = "Lettere";

var container = [
    '<h2 id="titoloApp"></h2>',
    '<div id="piattaforma"></div>'
].join('');

var piattAtt = [
    '<div id="contenuto">',
        '<div id="Guida" class="tabcontent">',
            '<div id="lightButton1"></div>',
            '<div id="imgAtt1"></div>',
            '<div id="lightButton2"></div>',
        '</div>',
        '<div id="Lettere" class="tabcontent">',
            '<div id="lightButton3"></div>',
            '<div id="imgAtt2"></div>',
            '<div id="lightButton4"></div>',
        '</div>',
    '</div>'
].join('');

var piattaforma = [
    '<div id="contenuto">',
        '<div id="Guida" class="tabcontent">',
            '<div id="traAtt1"></div>',
            '<div id="guideCounter">',
                '<div id="guideBarBalls"></div>',
                '<button class="bottoniguida" id="meno"></button>',
                '<button class="bottoniguida" id="piu"></button>',
            '</div>',
        '</div>',
        '</div>',
        '<div id="Lettere" class="tabcontent">',
            '<div id="buttonToGoBack">',
                '<div id="lightButton"></div>',
            '</div>',
            '<div id="spanArea"></div>',
        '</div>',
    '</div>'
].join('');

var question = [
    '<div id="ask">',
        '<div id="titoloTest">TEST WORKING MEMORY</div><br>',
            '<label style="font-weight:bold;">Indica la tua età</label><br>',
            '<input type="number" name="age" id="qAge" class="ageAsk"><br><br><br>',
            '<label style="font-weight:bold;">Qual\'è la tua acuità visiva?</label><br><br>',
            '<div id="viewAsk">',
                '<div class="bg">',
                    '<input name="c1" type="radio" id="qLenti">',
                    '<label> Corretta Da Lenti</label>',
                '</div>',
                '<div class="bg">',
                    '<input name="c1" type="radio" id="qNormale">',
                    '<label> Normale</label>',
                '</div>',
                '<div class="bg">',
                    '<input name="c1" type="radio" id="qDebole">',
                    '<label> Debole</label>',
                '</div>',
            '</div><br><br><br>',
            '<label style="font-weight:bold;">Qual\ è la tua conoscenza dell\'italiano?</label><br><br>',
            '<div id="itaAsk">',
                '<div class="bg">',
                    '<input name="c2" type="radio" id="qML">',
                    '<label> Madre-Lingua Italiana</label>',
                '</div>',
                '<div class="bg">',
                    '<input name="c2" type="radio" id="qParlante">',
                    '<label> Italiano-Parlanti dall\'infanzia</label>',
                '</div>',
                '<div class="bg">',
                    '<input name="c2" type="radio" id="qPoco">',
                    '<label> Bassa Conoscenza</label>',
                '</div>',
            '</div><br><br><br>',
            '<label style="font-weight:bold;">Assumi sostanze, farmaci o sei affetto da malattie che alterano le funzioni cognitive?</label><br><br>',
            '<div id="medAsk">',
                '<div class="bg">',
                    '<input name="c3" type="radio" id="qSosS">',
                    '<labe> Sì</label>',
                '</div>',
                '<div class="bg">',
                    '<input name="c3" type="radio" id="qSosN">',
                    '<label> No</label>',
                '</div>',
            '</div><br><br><br>',
            '<div id="inputAsk">',
                '<div class="bg">',
                    '<label style="font-weight:bold;">Inserisci il tuo Id</label><br>',
                    '<input type="number" name="age" id="qid" class="ageAsk"><br><br>',
                '</div>',
            '</div>',
            '<a class="bttn p0" id="infos">Inizia Test</a>',
            '<div id="adAsk"></div>',
    '</div>'
].join('');

var question2 = [
    '<div id="ask">',
        '<div id="titoloTest">TEST WORKING MEMORY</div><br>',
            '<label style="font-weight:bold;">Indica la tua età</label><br>',
            '<input type="number" name="age" id="qAge" class="ageAsk"><br><br>',
            '<label style="font-weight:bold;">Qual\'è la tua acuità visiva?</label><br><br>',
            '<div id="viewAsk">',
                '<div class="bg">',
                    '<input name="c1" type="radio" id="qLenti">',
                    '<label> Corretta Da Lenti</label>',
                '</div>',
                '<div class="bg">',
                    '<input name="c1" type="radio" id="qNormale">',
                    '<label> Normale</label>',
                '</div>',
                '<div class="bg">',
                    '<input name="c1" type="radio" id="qDebole">',
                    '<label> Debole</label>',
                '</div>',
            '</div><br><br>',
            '<label style="font-weight:bold;">Qual\'è la tua conoscenza dell\'italiano?</label><br><br>',
            '<div id="itaAsk">',
                '<div class="bg">',
                    '<input name="c2" type="radio" id="qML">',
                    '<label> Madre-Lingua Italiana</label>',
                '</div>',
                '<div class="bg">',
                    '<input name="c2" type="radio" id="qParlante">',
                    '<label> Italiano-Parlanti dall\'infanzia</label>',
                '</div>',
                '<div class="bg">',
                    '<input name="c2" type="radio" id="qPoco">',
                    '<label> Bassa Conoscenza</label>',
                '</div>',
            '</div><br><br>',
            '<label style="font-weight:bold;">Assumi sostanze, farmaci o sei affetto da malattie che alterano le funzioni cognitive?</label><br><br>',
            '<div id="medAsk">',
                '<div class="bg">',
                    '<input name="c3" type="radio" id="qSosS">',
                    '<labe> Sì</label>',
                '</div>',
                '<div class="bg">',
                    '<input name="c3" type="radio" id="qSosN">',
                    '<label> No</label>',
                '</div>',
            '</div><br><br>',
            '<div id="inputAsk">',
                '<div class="bg">',
                    '<label style="font-weight:bold;">Inserisci il tuo Id</label><br>',
                    '<input type="number" name="age" id="qid" class="ageAsk"><br>',
                '</div>',
            '</div>',
            '<a class="bttn p0" id="infos">Inizia Test</a>',
            '<div id="adAsk"></div>',
    '</div>'
].join('');

var update = [
        '<fieldset id="tracciamento">',
                '<legend id="legtrack"></legend>',
                    '<div class="statusTest" id="sta1">Training</div>',
                    '<div class="arrowTest"></div>',
                    '<div class="statusTest" id="sta2"></div>',
                    '<div class="arrowTest"></div>',
                    '<div class="statusTest" id="sta3">Pausa</div>',
                    '<div class="arrowTest"></div>',
                    '<div class="statusTest" id="sta4">Training</div>',
                    '<div class="arrowTest"></div>',
                    '<div class="statusTest" id="sta5"></div>',
        '</fieldset>'
].join('');

var OSName = "Unknown";
var resultsOST = new Array();
var resultsRST = new Array();
var recapOST = new Array();
var recapRST = new Array();
var recapAtt = new Array();
var trainingArr = new Array();
var recapTraAtt = new Array();
var xResultsOST = -1, xResultsRST = -1, xOST = -1, xRST = -1, xAtt = -1, xTra = -1, xTAtt = -1;
var totalStartTime, totalEndTime;
var userId, userAge;

var testoRisultati = "";
var testoRisultati2 = "";
var testoRisultati3 = "";
var testoRisultati4 = "";
var testoRisultati5 = "";
var testoRisultati6 = "";

var titoloTrain = "", testoTrain = "";
var testoOST = "", titoloOST = "", testoRecapOST = "", titoloRecapOST = "";
var testoRST = "", titoloRST = "", testoRecapRST = "", titoloRecapRST = "";

function findOS()
{
    if (window.navigator.userAgent.indexOf("Windows NT 10.0")!== -1) OSName="Windows 10";
    if (window.navigator.userAgent.indexOf("Windows NT 6.2") !== -1) OSName="Windows 8";
    if (window.navigator.userAgent.indexOf("Windows NT 6.1") !== -1) OSName="Windows 7";
    if (window.navigator.userAgent.indexOf("Windows NT 6.0") !== -1) OSName="Windows Vista";
    if (window.navigator.userAgent.indexOf("Windows NT 5.1") !== -1) OSName="Windows XP";
    if (window.navigator.userAgent.indexOf("Windows NT 5.0") !== -1) OSName="Windows 2000";
    if (window.navigator.userAgent.indexOf("Mac")            !== -1) OSName="Mac/iOS";
    if (window.navigator.userAgent.indexOf("X11")            !== -1) OSName="UNIX";
    if (window.navigator.userAgent.indexOf("Linux")          !== -1) OSName="Linux";
}

window.onload = function() 
{

    if(window.innerWidth > 1600)
    {
        document.body.style.fontSize = "16px";
    }
    document.getElementById("container").innerHTML = container;
    console.log(window.innerWidth);
    if(window.innerWidth <= 1366)
    {
        document.getElementById("piattaforma").innerHTML = question2;
    }
    else
    {
        document.getElementById("piattaforma").innerHTML = question;
    }
    document.getElementById("infos").addEventListener("click", function () 
    {
        var p = false;
        var listSelected = 0;
        var c1 = document.getElementsByName("c1");
        var c2 = document.getElementsByName("c2");
        var c3 = document.getElementsByName("c3");
        for ( var i = 0; i < c1.length; i++ ) 
        {
                if (c1[i].checked) 
                {
                        listSelected++;
                        break;
                }
        }
        for ( var i = 0; i < c2.length; i++ ) 
        {
                if (c2[i].checked) 
                {
                        listSelected++;
                        break;
                }
        }
        for ( var i = 0; i < c3.length; i++ ) 
        {
                if (c3[i].checked) 
                {
                        listSelected++;
                        break;
                }
        }

        if(document.getElementById("qid").value === "" || document.getElementById("qAge").value === "" || listSelected !== 3)
        {
            document.getElementById("adAsk").innerHTML = "Completa tutti i campi";
            p = false;
        }
        else
        {
            p = true;
        }

        if(document.getElementById("qSosS").checked === true || document.getElementById("qPoco").checked === true || 
                document.getElementById("qDebole").checked === true || (document.getElementById("qAge").value < 18 || document.getElementById("qAge").value > 65))
        {
            document.getElementById("adAsk").innerHTML = "Non hai i requisiti necessari a prendere parte a questo test";
            p = false;
        }
        
        if(p)
        {
            findOS();
            Go();
        }
    });
    
    alert("ATTENZIONE! Per il corretto funzionamento del test è necessario usare il browser Mozilla Firefox o Google Chrome");    
};

function Go(){
    if(window.innerWidth > 1600)
    {
        document.body.style.fontSize = "18px";
    }
    userId = document.getElementById("qid").value;
    userAge = document.getElementById("qAge").value;
    document.getElementById("piattaforma").innerHTML = piattaforma;
    document.getElementById("container").innerHTML += update;
    document.getElementById("legtrack").innerHTML = "Percorso Del Test - Utente " + userId;
    var qz = document.getElementsByClassName("arrowTest");
    for(var e = 0; e < qz.length; e++)
    {
        qz[e].innerHTML = '\uD83E\uDC6A';
    }
    document.getElementById("Lettere").style.display = "block";
    totalStartTime = new Date(new Date().getTime()).toLocaleDateString() + " " + new Date(new Date().getTime()).toLocaleTimeString() + " ." + new Date(new Date().getTime()).getMilliseconds();
    orders();
    ControlloCentrale();
}

/* function logTrain(a, b)  //crea il titolo per il training
{
    xTra++;
    trainingArr[xTra] = a;
    
    if(a === 0) //se è digit
    {
        titoloTrain += "TEST INDEX,TEST NAME,DS.DURATION TIME,DS.END TIME,DS.SET SIZE,DS.MAX POINTS,DS.MIN POINTS,DS.OUTCOME,DS.POINTS,DS.QUESTION,DS.RESPONSE,DS.RESULT,DS.START TIME,DS.ITEM NUMBER,";
    }
    else if(a === 1) //se è operation o reading
    {
        titoloTrain += "TEST INDEX,TEST NAME,ST.ANSWER,ST.DURATION TIME,ST.END TIME,ST.MAX POINTS,ST.MIN POINTS,ST.OUTCOME,ST.POINTS,ST.QUESTION,ST.RESPONSE,ST.RESULT,ST.START TIME,";
    }
    
    testoTrain += b;
    //sessionStorage.setItem("TR" + xTra, a);
} */

function logResultsOST(a, b) //crea le intestazioni per OST task e OST digitSpan
{
    xResultsOST++;  
    resultsOST[xResultsOST] = b;
    
    if(a === 0)
    {
        titoloOST += "TEST INDEX,TEST NAME,DS.DURATION TIME,DS.END TIME,DS.SET SIZE,DS.MAX POINTS,DS.MIN POINTS,DS.OUTCOME,DS.POINTS,DS.QUESTION,DS.RESPONSE,DS.RESULT,DS.START TIME,DS.ITEM NUMBER,";
    }
    else if(a === 1)
    {
        titoloOST += "TEST INDEX,TEST NAME,OST.ANSWER,OST.DURATION TIME,OST.END TIME,OST.MAX POINTS,OST.MIN POINTS,OST.OUTCOME,OST.POINTS,OST.QUESTION,OST.RESPONSE,OST.RESULT,OST.START TIME,";
    }
    
    testoOST += b;
    //sessionStorage.setItem("OS" + xResultsOST, a);
};

function logResultsRST(a, b) 
{
    xResultsRST++;  
    resultsRST[xResultsRST] = b;
    
    if(a === 0)
    {
        titoloRST += "TEST INDEX,TEST NAME,DS.DURATION TIME,DS.END TIME,DS.SET SIZE,DS.MAX POINTS,DS.MIN POINTS,DS.OUTCOME,DS.POINTS,DS.QUESTION,DS.RESPONSE,DS.RESULT,DS.START TIME,DS.ITEM NUMBER,";
    }
    else if(a === 1)
    {
        titoloRST += "TEST INDEX,TEST NAME,RST.ANSWER,RST.DURATION TIME,RST.END TIME,RST.MAX POINTS,RST.MIN POINTS,RST.OUTCOME,RST.POINTS,RST.QUESTION,RST.RESPONSE,RST.RESULT,RST.START TIME,";
    }
    
    testoRST += b;
    //sessionStorage.setItem("RS" + xResultsRST, a);
};

function logOSTRecap(a)
{
    xOST++;
    recapOST[xOST] = a;
    titoloRecapOST += "OST.ITEM SIZE,OST.N.ITEM,OST.RESULTS,OST.PROPORTION,";
    testoRecapOST += a;
    //sessionStorage.setItem("OST" + xOST, a);
}

function logRSTRecap(a)
{
    xRST++;
    recapRST[xRST] = a;
    titoloRecapRST += "RST.ITEM SIZE,RST.N.ITEM,RST.RESULTS,RST.PROPORTION,";
    testoRecapRST += a;
    //sessionStorage.setItem("RST" + xRST, a);
}

/* function saveResults(){  //salva i risultati del training 
    totalEndTime = new Date(new Date().getTime()).toLocaleDateString() + " " + new Date(new Date().getTime()).toLocaleTimeString() + " ." + new Date(new Date().getTime()).getMilliseconds();
    
    //  TRAINING
    testoRisultati = "USER ID,USER YEARS,SEX,OS VERSION,START SESSION TIME,END SESSION TIME,";
    testoRisultati2 = userId + "," + userAge + "," + "M" + "," + OSName + "," + totalStartTime + "," + totalEndTime + ","; 
    testoRisultati += titoloTrain;
    testoRisultati2 += testoTrain;
    testoRisultati += "\n";
    testoRisultati += testoRisultati2;
    var testoBlob = new Blob([testoRisultati], {type:"text/csv"});
    var textURL = window.URL.createObjectURL(testoBlob);
    var downloadLink = document.createElement("a");
    downloadLink.download = userId + "TrainingST" + ".csv";
    downloadLink.href = textURL;
    downloadLink.innerHTML = "Scarica i risultati 1 ";
    //downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    //downloadLink.click();
    saveResults2();
}  */

function saveResults2(){ //salva ii risultati dell'operation span task
    // OPERATION SPAN
    testoRisultati3 = "USER ID,USER YEARS,SEX,OS VERSION,START SESSION TIME,END SESSION TIME,,";
    testoRisultati4 = userId + "," + userAge + "," + "M" + "," + OSName + "," + totalStartTime + "," + totalEndTime + ",,"; 
    testoRisultati3 += titoloOST;
    testoRisultati4 += testoOST;
    testoRisultati3 += ",," + titoloRecapOST;
    testoRisultati4 += ",," + testoRecapOST;
    testoRisultati3 += ",," + "CORRECTNESS OF ELABORATION";
    testoRisultati4 += ",," + contOST;
    testoRisultati3 += "\n";
    testoRisultati3 += testoRisultati4;
    var testoBlob = new Blob([testoRisultati3], {type:"text/csv"});
    var textURL = window.URL.createObjectURL(testoBlob);
    var downloadLink = document.createElement("a");
    downloadLink.download = userId + "OST" + ".csv";
    downloadLink.href = textURL;
    downloadLink.innerHTML = "Scarica i risultati 2 ";
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    saveResults3();
}

function saveResults3(){ //salva i risultati del reading span task
    // READING SPAN
    testoRisultati5 = "USER ID,USER YEARS,SEX,OS VERSION,START SESSION TIME,END SESSION TIME,,";
    testoRisultati6 = userId + "," + userAge + "," + "M" + "," + OSName + "," + totalStartTime + "," + totalEndTime + ",,"; 
    testoRisultati5 += titoloRST;
    testoRisultati6 += testoRST;
    testoRisultati5 += ",," + titoloRecapRST;
    testoRisultati6 += ",," + testoRecapRST;
    testoRisultati5 += ",," + "CORRECTNESS OF ELABORATION";
    testoRisultati6 += ",," + contRST;
    testoRisultati5 += "\n";
    testoRisultati5 += testoRisultati6;
    var testoBlob = new Blob([testoRisultati5], {type:"text/csv"});
    var textURL = window.URL.createObjectURL(testoBlob);
    var downloadLink = document.createElement("a");
    downloadLink.download = userId + "RST" + ".csv";
    downloadLink.href = textURL;
    downloadLink.innerHTML = "Scarica i risultati 3 ";
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}


// **** //
// FUNZIONI //
// **** //

// CONTROLLO CENTRALE, FUNZIONE BASE SEMPRE IN ESECUZIONE
function ControlloCentrale()
{
    if(vvv !== 6)
    {
        UpdateStatus(vvv);
    }

    switch(vvv) {
        case 1:
          trainingST();
          break;
        case 2:
          startST();
          break;
        case 3:
          relax();
          break;
        case 4:
          trainingST();
          break;
        case 5:
          startST();
          break;
        case 6:
          endIt();
        break;
        
      }

}

// decide l'ordine tra RST e OST
function orders()
{
    ordineST = Math.floor(Math.random() * 2);
    ordineTra = ordineST;
    if(ordineST === 0)
    {
        document.getElementById("sta2").innerHTML = "Operation Span";
        document.getElementById("sta5").innerHTML = "Reading Span";
        document.getElementById("sta5").style.width = "80px";
        //document.getElementById("sta2").style.lineHeight = "30px";
    }
    else
    {
        document.getElementById("sta2").innerHTML = "Reading Span";
        document.getElementById("sta5").innerHTML = "Operation Span";
        document.getElementById("sta2").style.width = "80px";
        //document.getElementById("sta5").style.lineHeight = "30px";
    }
}

// aggiorna la barra sotto indicante a che punto si è nel test
function UpdateStatus(a)
{
    var qz = document.getElementsByClassName("statusTest");
    for(var e = 0; e < qz.length; e++)
    {
        qz[e].style.color = "black";
        qz[e].style.fontWeight = "normal";
    }
    qz[a-1].style.color = "green";
    qz[a-1].style.fontWeight = "bold";
}

// training iniziale dell'OST e del RST //
function trainingST(){  //se training è finito fa iniziare il test. Se non è finito controlla l'ordine e chiama i 
                        // diversi training (funzioni dentro trainingST) che a loro volta chiamano la presentazione del test
    op = 0;
    dsItemNumber++;
        
    if(trainingFinito){
        grade = 0;
        vvv++;
        dsItemNumber = 0;
        trainingFinito = false;
        trackOST = 0;
        trackTrack++;
        totST = 0;
       
        var endOfTraining = [
        '<div class="divEndTraining">',
            '<div>Training Completato.<br><br>Ricorda! Non riceverai più feedback durante il test.</div>',
            '<a class="bttn p3" id="p3">Inizia</a>',
        '</div>'
        ].join('');
        
        document.getElementById("spanArea").innerHTML = endOfTraining;
        document.getElementById("p3").addEventListener("click", ControlloCentrale);
    }else{
        if(ordineTra === 0 && trackTrack === 0){
            operation_training();
        }else if(ordineTra === 0 && trackTrack === 1){
            reading_training();
        }else if(ordineTra === 1 && trackTrack === 0){
            reading_training();
        }else if(ordineTra === 1 && trackTrack === 1){
            operation_training();
        }
    }
    
    function operation_training(){
        if(trackOST === 0){ 
            iterSpan = 1; //nel training itera due volte
            trackOST++;
            tout = setTimeout(operation_present, 8);
        }
        else if(trackOST === 1){
            iterSpan = 1; //nel training itera due volte
            trackOST++;
            tout = setTimeout(operation_span, 8);
        }
        else if(trackOST === 2){
            iterSpan = 3; //nel test itera 3 volte
            trackOST++;
            tout = setTimeout(operation_span, 8);
        }
        else if(trackOST === 3){
            iterSpan = 3; //nel test itera 3 volte
            tout = setTimeout(operation_span, 8);
            trainingFinito = true;
        }
    }
    
    function reading_training(){
        if(trackOST === 0){
            iterSpan = 2;
            trackOST++;
            tout = setTimeout(reading_present, 8);
        }
        else if(trackOST === 1){
            iterSpan = 2;
            trackOST++;
            tout = setTimeout(reading_span, 8);
        }
        else if(trackOST === 2){
            iterSpan = 3;
            trackOST++;
            tout = setTimeout(reading_span, 8);
        }
        else if(trackOST === 3){
            iterSpan = 3;
            tout = setTimeout(reading_span, 8);
            trainingFinito = true;
        }
    }
}

// ad ogni restart gestisce l'attività successiva OST, RST
function startST(){
    clearInterval(timeClock);
    op = 0;
    
    if(ordineST === 0)
    {
        if(combOST[0] === 0 && combOST[1] === 0 && combOST[2] === 0 && combOST[3] === 0)
        {
            console.log("OST FINITO");
            ordineST = 1;
            logOSTRecap(",,," + "PCU" + "," + (dsTotScore/12) + ",");
            dsTotScore = 0;
            iterSpan = 3;
            vvv++;
            tout = setTimeout(ControlloCentrale, 8);
        }
        else
        {
            var check = false;
            var d = Math.floor(Math.random() * 5) + 2;
            iterSpan = d;
            switch(d)
            {
                case 2: if(combOST[0] !== 0)
                        {
                            combOST[0]--;
                            check = true;
                        } break;
                case 3: if(combOST[1] !== 0)
                        {
                            combOST[1]--;
                            check = true;
                        } break;
                case 4: if(combOST[2] !== 0)
                        {
                            combOST[2]--;
                            check = true;
                        } break;
                case 5: if(combOST[3] !== 0)
                        {
                            combOST[3]--;
                            check = true;
                        } break;
            }
            if(check)
            {
                dsItemNumber++;
                tout = setTimeout(operation_span, 8);
            }
            else
            {
                tout = setTimeout(ControlloCentrale, 8);
            }  
        }
    }
    else if(ordineST === 1)
    {
        if(combRST[0] === 0 && combRST[1] === 0 && combRST[2] === 0 && combRST[3] === 0)
        {
            console.log("RST FINITO");
            ordineST = 0;
            logRSTRecap(",,," + "PCU" + "," + (dsTotScore/12) + ",");
            dsTotScore = 0;
            iterSpan = 3;
            vvv++;
            tout = setTimeout(ControlloCentrale, 8);
        }
        else
        {
            var check = false;
            var d = Math.floor(Math.random() * 5) + 2;
            iterSpan = d;
            switch(d)
            {
                case 2: if(combRST[0] !== 0)
                        {
                            combRST[0]--;
                            check = true;
                        } break;
                case 3: if(combRST[1] !== 0)
                        {
                            combRST[1]--;
                            check = true;
                        } break;
                case 4: if(combRST[2] !== 0)
                        {
                            combRST[2]--;
                            check = true;
                        } break;
                case 5: if(combRST[3] !== 0)
                        {
                            combRST[3]--;
                            check = true;
                        } break;
            }

            if(check)
            {
                dsItemNumber++;
                tout = setTimeout(reading_span, 8);
            }
            else
            {
                tout = setTimeout(ControlloCentrale, 8);
            }  
        }
    }   
}

// 2 minuti di pausa tra gli ST e l'attenzione divisa
function relax()
{
    var pause = [
        '<div id="divPause">Hai una pausa di 2 minuti',
            '<div id="timePause"></div>',
            '<div id="watchOutTime"></div>',
        '</div>'
    ].join('');
    
    document.getElementById("spanArea").innerHTML = pause;
    
    distance = 120000;
    clock();
    timeClock = setInterval(clock, 1000);
    
    function clock()
    {
        distance = distance - 1000;
        if (distance < 0) 
        {
            clearInterval(timeClock);
            vvv++;
            dsItemNumber = 0;
            tout = setTimeout(ControlloCentrale, 8);
        }
        else
        {
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            document.getElementById("timePause").innerHTML = minutes + "m " + seconds + "s ";
            if(distance < 10000)
            {
                document.getElementById("watchOutTime").innerHTML = "ATTENZIONE!<BR>STA PER INIZIARE UN NUOVO TEST";
            }
        }
    }
}


//
// OPERATION SPAN // 
//

// introduzione allo operation span task crea le 4 pagine di spiegazioni e esempi
function operation_present()
{
    var p1 = [
        '<div id="p1">In questo test le saranno mostrate delle serie di numeri.<br><br> Per esempio: 63, 35, 22<br><br> Dopo la presentazione dell’ultimo numero della serie (22 nell’esempio)<br> le verrà chiesto di ricordare i numeri nello stesso ordine in cui sono stati presentati.<br><br> La lunghezza di ogni serie di numeri sarà variabile (da 3 a 5 numeri).<br><br>I numeri di ogni serie appariranno sullo schermo uno alla volta<br> e ogni numero rimarrà sullo schermo per 1 secondo.<br><br>La seguente immagine mostra un esempio di come verrà presentato il primo numero della serie:</div>'
    ].join('');
    
    var p3 = [
        '<a class="bttn p3" id="p3">Continua</a>'
    ].join('');
    
    cleanWindow();
    document.getElementById("spanArea").innerHTML += p1;
    numCenterA();
    document.getElementById("spanArea").innerHTML += p3;
    document.getElementById("p3").addEventListener("click", operation_present2);
    
    function operation_present2(){
        var p2 = [
            '<div id="p2">Per ogni serie numerica, fra la presentazione di un numero e l’altro, apparirà sullo schermo un’operazione matematica.<br>Per esempio, dopo il 63 (nella serie 63, 35, 22) potrebbe apparire la seguente operazione:</div>'
        ].join('');
        
        var p3 = [
            '<div id="p14">Lei dovrà valutare se l’operazione è corretta o meno e cliccare sul bottone corrispondente alla sua risposta.<br><br>Provi:</div>'
        ].join('');

        cleanWindow();
        document.getElementById("spanArea").innerHTML += p2;
        operation(2);
        document.getElementById("spanArea").innerHTML += p3;
        buttons();
        document.getElementById("choice1").innerHTML = "Corretta";
        document.getElementById("choice2").innerHTML = "Incorretta";
        document.getElementById("choice1").addEventListener("click", function(){
            document.getElementById("choice1").style.display = "none";
            document.getElementById("choice2").style.display = "none";
            document.getElementById("p2").style.height = "72px";
            document.getElementById("p2").innerHTML = "";
            document.getElementById("p14").style.height = "72px";
            document.getElementById("p14").innerHTML = "L'operazione valutata è incorretta";
            document.getElementById("p14").style.fontWeight = "bold";
            document.getElementById("p14").style.fontSize = "20px";
            checkLight(false, 5000);
            tout = setTimeout(operation_present3, 5001);
        });
        document.getElementById("choice2").addEventListener("click", function (){
            document.getElementById("p2").style.height = "72px";
            document.getElementById("choice1").style.display = "none";
            document.getElementById("choice2").style.display = "none";
            document.getElementById("p2").innerHTML = "";
            document.getElementById("p14").style.height = "72px";
            document.getElementById("p14").innerHTML = "L'operazione valutata è incorretta";
            document.getElementById("p14").style.fontWeight = "bold";
            document.getElementById("p14").style.fontSize = "20px";
            checkLight(true, 5000);
            tout = setTimeout(operation_present3, 5001);
        });    
    }
    
    function operation_present3()
    {
        var p2 = [
            '<div id="p2">Successivamente le verrà presentato il secondo numero della serie, il 35 (nella serie dell’esempio: 63, 35, 22)<br> e immediatamente dopo una nuova operazione.<br><br> Per esempio:</div>'
        ].join('');
        
        var p3 = [
            '<div id="p14">Di nuovo, Lei dovrà rispondere se l’operazione è o meno corretta.<br><br>Provi:</div>'
        ].join('');

        cleanWindow();
        document.getElementById("spanArea").innerHTML += p2;
        operation(1);
        document.getElementById("spanArea").innerHTML += p3;
        buttons();
        document.getElementById("choice1").innerHTML = "Corretta";
        document.getElementById("choice2").innerHTML = "Incorretta";
        document.getElementById("choice1").addEventListener("click", function() 
        {
            document.getElementById("choice1").style.display = "none";
            document.getElementById("choice2").style.display = "none";
            document.getElementById("p2").style.height = "72px";
            document.getElementById("p2").innerHTML = "";
            document.getElementById("p14").style.height = "72px";
            document.getElementById("p14").innerHTML = "L'operazione valutata è corretta";
            document.getElementById("p14").style.fontWeight = "bold";
            document.getElementById("p14").style.fontSize = "20px";
            checkLight(true, 450);
            tout = setTimeout(operation_present4, 5001);
        });
        document.getElementById("choice2").addEventListener("click", function () 
        {
            document.getElementById("p2").style.height = "72px";
            document.getElementById("choice1").style.display = "none";
            document.getElementById("choice2").style.display = "none";
            document.getElementById("p2").innerHTML = "";
            document.getElementById("p14").style.height = "72px";
            document.getElementById("p14").innerHTML = "L'operazione valutata è corretta";
            document.getElementById("p14").style.fontWeight = "bold";
            document.getElementById("p14").style.fontSize = "20px";
            checkLight(false, 450);
            tout = setTimeout(operation_present4, 5001);
        });    
    }
    
    function operation_present4(){
        var p1 = [
        '<div id="p1">Dopo la presentazione dell’ultimo numero della serie (il 22 nella serie dell’esempio: 63, 35, 22)',
        ' le verrà chiesto<br> di ricordare i numeri della serie nello stesso ordine in cui sono stati presentati.<br><br>',
        'Per la serie dell’esempio, la risposta corretta è: 63, 35, 22<br><br>',
        'Invece 35, 63, 22 è una risposta sbagliata.<br><br>',
        'I numeri dovranno essere inseriti uno a uno nel seguente campo. <br>A ogni inserimento sarà necessario cliccare',
        'sul bottone "VAI" o premere il tasto "Invio" sulla tastiera. </div>'
        ].join('');
        var input = [
            '<fieldset id="fieldInsert"style="margin: 1em auto;">',
                '<legend id="lgInsertNumber">Inserisci il numero X</legend>',
                '<div id="divNum">',
                    '<input id="inputUser" autocomplete="off" readonly="readonly"  value="" placeholder="">',
                    '<a class="bttn ii" id="toInput">Vai</a>',
                '</div>',
            '</fieldset>'
        ].join('');

        var p4 = [
            '<div>N.B.: E\' importante che cerchi di fare del suo meglio sia quando giudica le operazioni sia quando ',
            'ricorda le serie numeriche.<br><br>',
            '<a class="bttn p3" id="p3" title="Inizia l\'operation_span">Inizia</a>'
        ].join('');

        cleanWindow();
        document.getElementById("spanArea").innerHTML += p1 + input;
        document.getElementById("spanArea").innerHTML += p4;
        //document.getElementById("p4").addEventListener("click", function () {numTrak = 0;opTrak = 0;iterSpan = 3;ControlloCentrale();});
        document.getElementById("p3").addEventListener("click", function () {operation_span();});
    }
}

function operation_span(){ //mostra il numero per un secondo e mostra l'operazione e chiama operation_span_supp
    op++;
    cleanWindow();
    tiet = setTimeout(numCenter, 1000);
    tiet = setTimeout(cleanWindow, 2000);
    tiet = setTimeout(function () {operation(3);}, 3000);
    tiet = setTimeout(buttons, 3000);
    tiet = setTimeout(operation_span_supp, 3000);
}

function operation_span_supp(){ //crea i due bottoni

    document.getElementById("choice1").innerHTML = "Corretta";
    document.getElementById("choice2").innerHTML = "Incorretta";
    document.getElementById("choice1").addEventListener("click",  function() {operation_span_supp2(true);});
    document.getElementById("choice2").addEventListener("click",  function() {operation_span_supp2(false);});
}

function operation_span_supp2(a){ //aggiorna i risultati nel log sia per il training che per il test PER OPERATION
    endTime = new Date();
    durEndTime = new Date(new Date().getTime()).toLocaleTimeString() + " ." + new Date(new Date().getTime()).getMilliseconds();
    durationTime = endTime - startTime;
    var usT = 0, real = 0;
    testIndex++;
    totST++;

    if(a){
        usT = 1;
    }else{
        usT = 0;
    }
    
    if(opMatch){
        real = 1;
    }else{
        real = 0;
    }
    
    if(opMatch === a){ //se l'utente ha risposto correttamente
        if(vvv === 1 || vvv === 4){// se è il training aggiungi i dati al log del training
            checkLight(true, 600);
            //logTrain(1, testIndex + "," + "Operation Span" + "," + real + "," + durationTime + "," + durEndTime + "," + 1 + "," + 0 + "," + "FINISHED" + "," + 1 + "," + OSTResult + "," + usT + "," + "success" + "," + durStartTime + ",");
        }else{ //se è il test aggiungi i dati al log del test
            rightOST++;
            contOST = rightOST/totST;
            logResultsOST(1, testIndex + "," + "Operation Span" + "," + real + "," + durationTime + "," + durEndTime + "," + 1 + "," + 0 + "," + "FINISHED" + "," + 1 + "," + OSTResult + "," + usT + "," + "success" + "," + durStartTime + ",");
        }
    }
    else{ //se l'utente ha risposto male 
        if(vvv === 1 || vvv === 4) { //training
            checkLight(false, 600);
            //logTrain(1, testIndex + "," + "Operation Span" + "," + real + "," + durationTime + "," + durEndTime + "," + 1 + "," + 0 + "," + "FINISHED" + "," + 0 + "," + OSTResult + "," + usT + "," + "failure" + "," + durStartTime + ",");
        }else{ //test
            contOST = rightOST/totST;
            logResultsOST(1, testIndex + "," + "Operation Span" + "," + real + "," + durationTime + "," + durEndTime + "," + 1 + "," + 0 + "," + "FINISHED" + "," + 0 + "," + OSTResult + "," + usT + "," + "failure" + "," + durStartTime + ",");
        }
    }
    
    if(op !== iterSpan){ //controlla se deve continuare con la serie o se la serie numerica è finita.
        operation_span();
    }else{
        numberCheck();
    }  
}

// per mostrare un'operazione aritmetica a schermo
function operation(a){
    var uguale = "=";
    var frag = [
        '<div id="midWay"></div>'
    ].join('');
    
    durStartTime = new Date(new Date().getTime()).toLocaleTimeString() + " ." + new Date(new Date().getTime()).getMilliseconds();
    startTime = new Date();
    
    var oper = Math.floor((Math.random() * 4) +1);
    var operand1 = Math.floor((Math.random() * 11) +1);
    var operand2 = Math.floor((Math.random() * 11) +1);
    
    var operator, result;
    
    var correctEquation;
    if(a === 1){
        correctEquation = true;
    }else if(a === 2){
        correctEquation = false;
    }else{
        correctEquation = Math.floor((Math.random() * 2) +1) === 1;
    }

    if (oper === 4){
        var modResult = operand1 % operand2;
        while (modResult !== 0){
                operand2 = Math.floor((Math.random() * 11) +1);
                modResult = operand1 % operand2;
        }
    }

    switch(oper){
        case 1:
                operator = '+';
                if (correctEquation) {
                        result = operand1 + operand2;
                } else {
                        result = operand1 + operand2 + Math.floor((Math.random() * 9) +1); 
                }
                break;
        case 2:
                operator = '-';
                if (correctEquation){
                        result = operand1 - operand2;
                } else {
                        result = operand1 - operand2 - Math.floor((Math.random() * 9) +1); 
                }
                break;
        case 3:
                operator = 'x';
                if (correctEquation) {
                        result = operand1 * operand2;
                } else {
                        result = (operand1 * operand2) + Math.floor((Math.random() * 9) +1);
                }
                break;
        case 4:
                operator = '/';
                if (correctEquation){
                        result = operand1 / operand2;
                } else{
                        result = operand1 / operand2 - Math.floor((Math.random() * 9) +1); 
                }
                break;
    }

    if(correctEquation){
        opMatch = true;
    }
    else{
        opMatch = false;
    }

    document.getElementById("spanArea").innerHTML += frag;
    
    if(typeof opTra[opTrak] === "undefined"){
        document.getElementById("midWay").innerHTML = operand1 + " "  + operator +  " " + operand2 + " " + uguale + " " + result;
        OSTResult = operand1 + " "  + operator +  " " + operand2 + " " + uguale + " " + result;
        opTra[opTrak] = OSTResult + "." + opMatch;
        opTrak++;
    }else{
        if(opTra[opTrak].indexOf(".") !== -1)
        {
            opTra[opTrak] = opTra[opTrak].split(".");
        }
        document.getElementById("midWay").innerHTML = opTra[opTrak][0];
        OSTResult = opTra[opTrak][0].trim();
        opMatch = opTra[opTrak][1].trim();
        if(opMatch === "true"){
            opMatch = true;
        }else if (opMatch === "false"){
            opMatch = false;
        }
        opTrak++;
    }
}   


//
// READING SPAN //
//

// introduzione allo span
function reading_present(){ //come per l'operation mostra le 5 pagine di spiegazione
    var p1 = [
        '<div id="p1">In questo test le saranno mostrate delle serie di numeri.<br><br> ',
        'Per esempio: 63, 35, 22<br><br> Dopo la presentazione dell’ultimo numero della serie (22 nell’esempio)<br>',
        'le verrà chiesto di ricordare i numeri nello stesso ordine in cui sono stati presentati.<br><br>',
        'La lunghezza di ogni serie di numeri sarà variabile (da 3 a 5 numeri).<br><br>',
        'I numeri di ogni serie appariranno sullo schermo uno alla volta<br> e ',
        'ogni numero rimarrà sullo schermo per 1 secondo.<br><br>',
        'La seguente immagine mostra un esempio di come verrà presentato il primo numero della serie:</div>'
    ].join('');

    var p3 = [
        '<a class="bttn p3" id="p3">Continua</a>'
    ].join('');
    
    cleanWindow();
    document.getElementById("spanArea").innerHTML += p1;
    numCenterA();
    document.getElementById("spanArea").innerHTML += p3;
    document.getElementById("p3").addEventListener("click", reading_present2);
    
    function reading_present2(){
        var p1 = [
            '<div id="p18">Per ogni serie numerica, fra la presentazione di un numero e l’altro, ',
            'apparirà sullo schermo una frase.<br><br> Per esempio, dopo il 63 (nella serie 63, 35, 22) ',
            'potrebbe apparirebbe una frase come:</div>'
        ].join('');

        var p2 = [
            '<div id="midWay">Le anatre indossano scarpe da tennis</div>'
        ].join('');
        
        var p3 = [
            '<div id="p14">Lei dovrà valutare se il contenuto della frase è “reale” (inteso come verosimile)',
            ' o “non è reale” (inteso come non verosimile).<br><br>Provi:</div>'
        ].join('');
    
        cleanWindow();
        document.getElementById("spanArea").innerHTML += p1;
        document.getElementById("spanArea").innerHTML += p2;
        document.getElementById("spanArea").innerHTML += p3;
        buttons();
        document.getElementById("choice1").innerHTML = "Reale";
        document.getElementById("choice2").innerHTML = "Non è reale";
        document.getElementById("choice1").addEventListener("click", function() {
            document.getElementById("choice1").style.display = "none";
            document.getElementById("choice2").style.display = "none";
            document.getElementById("p18").style.height = "72px";
            document.getElementById("p18").innerHTML = "";
            document.getElementById("p14").innerHTML = "La frase valutata non è reale";
            document.getElementById("p14").style.fontWeight = "bold";
            document.getElementById("p14").style.fontSize = "20px";
            checkLight(false, 5000);
            tout = setTimeout(reading_present3, 5001);
        });
        document.getElementById("choice2").addEventListener("click", function () {
            document.getElementById("p18").style.height = "72px";
            document.getElementById("choice1").style.display = "none";
            document.getElementById("choice2").style.display = "none";
            document.getElementById("p18").innerHTML = "";
            document.getElementById("p14").innerHTML = "La frase valutata non è reale";
            document.getElementById("p14").style.fontWeight = "bold";
            document.getElementById("p14").style.fontSize = "20px";
            checkLight(true, 5000);
            tout = setTimeout(reading_present3, 5001);
        });    
    }  
    
    function reading_present3(){
        var p1 = [
            '<div id="p18">Successivamente le verrà presentato il secondo numero della serie, ',
            'il 35 (nella serie dell’esempio: 63, 35, 22)<br> e immediatamente dopo una nuova frase.<br><br>',
            'Per esempio:</div>'
        ].join('');
        
        var p2 = [
           '<div id="midWay">Ho bisogno di una teiera per fare il té</div>'
        ].join('');
        
        var p3 = [
            '<div id="p14">Di nuovo, Lei dovrà rispondere se il contenuto è “reale” o “non è reale”.<br><br>Provi:</div>'
        ].join('');
        
        cleanWindow();
        document.getElementById("spanArea").innerHTML += p1;
        document.getElementById("spanArea").innerHTML += p2;
        document.getElementById("spanArea").innerHTML += p3;
        buttons();
        document.getElementById("choice1").innerHTML = "Reale";
        document.getElementById("choice2").innerHTML = "Non è reale";
        document.getElementById("choice1").addEventListener("click", function(){
            document.getElementById("p18").style.height = "72px";
            document.getElementById("choice1").style.display = "none";
            document.getElementById("choice2").style.display = "none";
            document.getElementById("p18").innerHTML = "";
            document.getElementById("p14").innerHTML = "La frase valutata è reale";
            document.getElementById("p14").style.fontWeight = "bold";
            document.getElementById("p14").style.fontSize = "20px";
            checkLight(true, 5000);
            tout = setTimeout(reading_present4, 5001);
        });
        document.getElementById("choice2").addEventListener("click", function () {
            document.getElementById("p18").style.height = "72px";
            document.getElementById("choice1").style.display = "none";
            document.getElementById("choice2").style.display = "none";
            document.getElementById("p18").innerHTML = "";
            document.getElementById("p14").innerHTML = "La frase valutata è reale";
            document.getElementById("p14").style.fontWeight = "bold";
            document.getElementById("p14").style.fontSize = "20px";
            checkLight(false, 5000);
            tout = setTimeout(reading_present4, 5001);
        });   
    }  
    
    function reading_present4() {
        var p5 = [
            '<div id="p5">NB: non si chiede di giudicare se una frase sia vera o falsa ma se il suo contenuto<br> sia realistico o meno nel contesto della vita reale/quotidiana.<br><br> Nella prima frase dell’esempio (“le anatre indossano scarpe da tennis”) siamo sul piano<br>dell\'irreale, eccezionale, assurdo, quindi il contenuto “non è reale”.<br><br> Invece il contenuto della seconda frase (“ho bisogno di una teiera per fare il té”)<br> è “realistico” nel contesto quotidiano.</div>'
        ].join();

        var p3 = [
            '<a class="bttn p3" id="p3">Continua</a>'
        ].join('');

        cleanWindow();
        document.getElementById("spanArea").innerHTML = p5 + p3;
        document.getElementById("p3").addEventListener("click", reading_present5); 
    }
    
    function reading_present5(){
        var p2 = [
            '<div>Dopo la presentazione dell’ultimo numero della serie (il 22 nella serie dell’esempio: 63, 35, 22)<br>',
            ' le verrà chiesto di ricordare i numeri nello stesso ordine in cui sono stati presentati.<br><br>',
            'Per la serie dell’esempio, la risposta corretta è: 63, 35, 22<br><br> ',  
            'Invece 35, 63, 22 è una risposta sbagliata.<br><br> ',
            'I numeri dovranno essere inseriti uno a uno nel seguente campo. <br>A ogni inserimento sarà necessario cliccare',
            'sul bottone "VAI" o premere il tasto "Invio" sulla tastiera. </div>'
        ].join('');

        var input = [
            '<fieldset id="fieldInsert"style="margin: 1em auto;">',
                '<legend id="lgInsertNumber">Inserisci il numero X</legend>',
                '<div id="divNum">',
                    '<input id="inputUser" autocomplete="off" readonly="readonly"  value="" placeholder="">',
                    '<a class="bttn ii" id="toInput">Vai</a>',
                '</div>',
            '</fieldset>'
        ].join('');
        
        var p3 = [
            //'<a class="bttn p3" id="p4">Indietro</a>',
            '<div>N.B.: E\' importante che cerchi di fare del suo meglio sia quando giudica le frasi sia quando ',
            'ricorda le serie numeriche.<br><br>',
            'Premi “inizia” per fare alcune prove di training prima di fare il test.</div>',
            '<a class="bttn p3" id="p3">Inizia</a>'
        ].join('');
        
        cleanWindow();
        document.getElementById("spanArea").innerHTML = p2 + input + p3;
        //document.getElementById("p4").addEventListener("click", function () {numTrak = 0; frTrak = 0;iterSpan = 3;ControlloCentrale();});
        document.getElementById("p3").addEventListener("click", function () {reading_span();});
    }
}

function reading_span(){//chiama le funzioni che mostrano il num per 1 sec e mostrano la frase, poi chiama supp
    op++;
    cleanWindow();
    tiet = setTimeout(numCenter, 1000);
    tiet = setTimeout(cleanWindow, 2000);
    tiet = setTimeout(readPhrase, 3000);
    tiet = setTimeout(buttons, 3050);
    tiet = setTimeout(reading_span_supp, 3050);
}

function reading_span_supp() { //crea i bottoni e chiama supp 2
    document.getElementById("choice1").innerHTML = "Reale";
    document.getElementById("choice2").innerHTML = "Non è reale";
    document.getElementById("choice1").addEventListener("click",  function() {reading_span_supp2(true);});
    document.getElementById("choice2").addEventListener("click",  function() {reading_span_supp2(false);});
}

function reading_span_supp2(a){ //aggiorna i risultati del log sia per il training che per il test per il READING
    endTime = new Date();
    durEndTime = new Date(new Date().getTime()).toLocaleTimeString() + " ." + new Date(new Date().getTime()).getMilliseconds();
    durationTime = endTime - startTime;
    var usT = 0, real = 0;
    testIndex++;
    totST++;
    
    if(a){
        usT = 1;
    }else{
        usT = 0;
    }
    
    if(readMatch){
        real = 1;
    }else{
        real = 0;
    }
    
    if(readMatch === a){ //se la risposta è corretta
        if(vvv === 1 || vvv === 4){ //training
            checkLight(true, 600);
            //logTrain(1, testIndex + "," + "Reading Span" + "," + real + "," + durationTime + "," + durEndTime + "," + 1 + "," + 0 + "," + "FINISHED" + "," + 1 + "," + RSTResult + "," + usT + "," + "success" + "," + durStartTime + ",");
        }else{ //test
            rightRST++;
            contRST = rightRST/totST;
            logResultsRST(1, testIndex + "," + "Reading Span" + "," + real + "," + durationTime + "," + durEndTime + "," + 1 + "," + 0 + "," + "FINISHED" + "," + 1 + "," + RSTResult + "," + usT + "," + "success" + "," + durStartTime + ",");
        }
    }else{ //se la risposta è sbagliata
        if(vvv === 1 || vvv === 4){
            checkLight(false, 600);
            //logTrain(1, testIndex + "," + "Reading Span" + "," + real + "," + durationTime + "," + durEndTime + "," + 1 + "," + 0 + "," + "FINISHED" + "," + 0 + "," + RSTResult + "," + usT + "," + "failure" + "," + durStartTime + ",");
        }else{
            contRST = rightRST/totST;
            logResultsRST(1, testIndex + "," + "Reading Span" + "," + real + "," + durationTime + "," + durEndTime + "," + 1 + "," + 0 + "," + "FINISHED" + "," + 0 + "," + RSTResult + "," + usT + "," + "failure" + "," + durStartTime + ",");
        }
    }
    
    if(op !== iterSpan)
    {
        reading_span();
    }
    else
    {
        numberCheck();
    }  
}

// mostra a schermo la frase da valutare
function readPhrase()
{
    var phrase = [
        '<div id="midWay">',
        '</div>'
        ].join('');
        
    document.getElementById("spanArea").innerHTML += phrase;
    
    durStartTime = new Date(new Date().getTime()).toLocaleTimeString() + " ." + new Date(new Date().getTime()).getMilliseconds();
    startTime = new Date();
    
    if(vvv === 1 || vvv === 4)
    {
        if(typeof frTra[frTrak] === "undefined")
        {
            var file = "Esterne/silly_training.txt";
            var b = Math.floor(Math.random() * 10);

            while(RSTT[b] === 0)
            {
                b = Math.floor(Math.random() * 10);
            }
            RSTT[b] = 0;
            tout = setTimeout(function () {readTextFile(file, b);}, 8);
        }
        else
        {
            if(frTra[frTrak].indexOf(".") !== -1)
            {
                frTra[frTrak] = frTra[frTrak].split(".");
            }
            document.getElementById("midWay").innerHTML = frTra[frTrak][0];
            RSTResult = frTra[frTrak][0].trim();
            readMatch = frTra[frTrak][1].trim();
            if(readMatch === "true")
            {
                readMatch = true;
            }
            else if (readMatch === "false")
            {
                readMatch = false;
            }
            frTrak++;
        }  
    }
    else
    {
        choosePhrase();
    }
    
    function choosePhrase()
    {
        var file, b, bz, check1 = 0, check2 = 0;
        
        for(var a = 0; a <= RST1.length; a++)
        {
            if(RST1[a] === 1)
            {
                check1 = 1;
            }
        }

        for(var a = 0; a <= RST2.length; a++)
        {
            if(RST2[a] === 1)
            {
                check2 = 1;
            }
        }

        if(check1 === 0 && check2 === 0)
        {
            tout = setTimeout(ControlloCentrale, 8);
        }
        else if(check1 === 0 && check2 === 1)
        {
            bz = 2;
        }
        else if(check1 === 1 && check2 === 0)
        {
            bz = 1;
        }
        else
        {
            bz = Math.floor((Math.random() * 2)) +1;
        }


        if(bz === 1)
        {
            b = Math.floor(Math.random() * 21);

            while(RST1[b] === 0)
            {
                b = Math.floor(Math.random() * 21);
            }

            file = "Esterne/silly_sentences_1.txt";
            if(vvv !== 1 && vvv !== 4)
            {
                RST1[b] = 0;
            }
            tout = setTimeout(function () {readTextFile(file, b);}, 2);

        }
        else if(bz === 2)
        {
            b = Math.floor(Math.random() * 21);

            while(RST2[b] === 0)
            {
                b = Math.floor(Math.random() * 21);
            }

            file = "Esterne/silly_sentences_2.txt";
            if(vvv !== 1 && vvv !== 4)
            {
                RST2[b] = 0;
            }
            tout = setTimeout(function () {readTextFile(file, b);}, 2);
        }  
    }
    
    // prende una frase da mostrare da sillysentences1 o sillysentences2
    function readTextFile(file, b)
    {

        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file , true);
        rawFile.overrideMimeType('text/xml; charset=iso-8859-1');
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status === 0)
                {
                    var allText = rawFile.responseText;
                    allText = allText.split("\n");

                    allText[b] = allText[b].split(", ");

                    var fixedstring;
                    try
                    {
                        fixedstring = decodeURIComponent(escape(allText[b][0]));
                    }
                    catch(e)
                    {
                        fixedstring = allText[b][0];
                    }
                    
                     
                    document.getElementById("midWay").innerHTML = fixedstring;
                    RSTResult = fixedstring;

                    var answer = allText[b][1];
                    var ee = "y";

                    if(answer.trim() === ee.trim())
                    {
                        readMatch = true;
                    }
                    else
                    {
                        readMatch = false;
                    }
                    
                    if(vvv === 1 || vvv === 4)
                    {
                        frTra[frTrak] = fixedstring + "." + readMatch;
                        frTrak++;
                    }
                }
            }
        };

        rawFile.send(null);
    } 
}

// pulisce lo schermo
function cleanWindow()
{
    document.getElementById("spanArea").innerHTML = "";
}

// mostra un numero casuale al centro dello schermo; per le introduzioni degli spans
function numCenterA()
{
    var num = [
        '<div id="numberCenterA"></div>'
    ].join('');
    document.getElementById("spanArea").innerHTML += num;
    if(typeof numTra[numTrak] === "undefined")
    {
        //var numRand = Math.floor(Math.random() * 90) + 10;
        numTra[numTrak] = numberST;
        numTrak++;
        document.getElementById("numberCenterA").innerHTML = numberST;
    }
    else
    {
        document.getElementById("numberCenterA").innerHTML = numTra[numTrak];
        numTrak++;
    }
    
}

//crea due bottoni dell'intervallo
function buttons()
{
    var b = [
        '<div id="decisionButtons">',
            '<a class="bttn cc" href="#0" id="choice1"></a>',
            '<a class="bttn cc" href="#0" id="choice2"></a>',
        '</div>'
    ].join('');
    document.getElementById("spanArea").innerHTML += b;
}

// piazza un numero al centro dello schermo
function numCenter()
{
    var num = [
        '<div id="numberCenter"></div>'
    ].join('');
    document.getElementById("spanArea").innerHTML = num;
    if(typeof numTra[numTrak] === "undefined")
    {
        var numRand = Math.floor(Math.random() * 90) + 10;
        numTra[numTrak] = numRand;
        document.getElementById("numberCenter").innerHTML = numRand;
        generatedNum[y] = numRand;
        y++;
        numTrak++;
    }
    else
    {
        document.getElementById("numberCenter").innerHTML = numTra[numTrak];
        generatedNum[y] = numTra[numTrak];
        y++;
        numTrak++;
    } 
}

// luce per la correttezza o meno della risposta
function checkLight(a, b)
{
    clearTimeout(timeOutLight);
    
    if(a)
    {
        document.getElementById("lightButton").innerHTML = "Giusto!";
        document.getElementById("lightButton").style.color = "green";
        timeOutLight = setTimeout(cleanLight, b);  
    }
    else
    {
        document.getElementById("lightButton").innerHTML = "Sbagliato!";
        document.getElementById("lightButton").style.color = "red";
        timeOutLight = setTimeout(cleanLight, b);
    }
}

// pulisce il div della luce verde/rossa
function cleanLight()
{
    document.getElementById("lightButton").innerHTML = "";
}

// check dei numeri visualizzati
function numberCheck(){
    var input = [
        '<fieldset id="fieldInsert">',
            '<legend id="lgInsertNumber"></legend>',
            '<div id="divNum">',
                '<input id="inputUser" onkeypress="return event.charCode >= 48 && event.charCode <= 57" value="" placeholder="">',
                '<a class="bttn ii" id="toInput">Vai</a>',
            '</div>',
        '</fieldset>'
    ].join('');
    
    numcont = 1;
    grade = 0;
    dsPartialScore = 0;
    
    startTime = new Date();
    durStartTime = new Date(new Date().getTime()).toLocaleTimeString() + " ." + new Date(new Date().getTime()).getMilliseconds();
    
    document.getElementById("spanArea").innerHTML = input;
    document.getElementById("lgInsertNumber").innerHTML = "Inserisci il numero " + numcont;
    document.getElementById("toInput").addEventListener("click", insertInput);
    document.getElementById("inputUser").addEventListener('keypress', function(e){
        if(e.key==='Enter'){insertInput()}
    }
    
    );

    
    function insertInput(){   //Aggiorna i log
        testIndex++;
        endTime = new Date();
        durEndTime = new Date(new Date().getTime()).toLocaleTimeString() + " ." + new Date(new Date().getTime()).getMilliseconds();
        durationTime = endTime - startTime;

        var fg = "";

        if(numcont === op){
            fg = "FINISHED";
        }else{
            fg = "SUSPENDED";
        }

        var s = document.getElementById("inputUser").value;
        inputNum[x] = parseInt(s);
        if(generatedNum[x] === inputNum[x]){ //se il numero inserito è giusto.
            grade++;
            if(vvv !== 1 && vvv !== 4){ //TEST
                if(ordineST === 0){ //OPERATION
                    logResultsOST(0, testIndex + "," + "DigitSpan" + "," + durationTime + "," + durEndTime + "," + op + "," + 1 + "," + 0 + "," + fg + "," + 1 + "," + generatedNum[x] + "," + inputNum[x] + "," + "success" + "," + durStartTime + "," + dsItemNumber + ",");
                }else{     //READING
                    logResultsRST(0, testIndex + "," + "DigitSpan" + "," + durationTime + "," + durEndTime + "," + op + "," + 1 + "," + 0 + "," + fg + "," + 1 + "," + generatedNum[x] + "," + inputNum[x] + "," + "success" + "," + durStartTime + "," + dsItemNumber + ",");
                }  
            }else{ //TRAINING
                checkLight(true, 600);
                //logTrain(0, testIndex + "," + "DigitSpan" + "," + durationTime + "," + durEndTime + "," + op + "," + 1 + "," + 0 + "," + fg + "," + 1 + "," + generatedNum[x] + "," + inputNum[x] + "," + "success" + "," + durStartTime + "," + dsItemNumber + ",");
            }
        }else{ //se il numero inserito è sbagliato
            if(vvv !== 1 && vvv !== 4){ //TEST
                if(ordineST === 0){   //OPERATION
                    logResultsOST(0, testIndex + "," + "DigitSpan" + "," + durationTime + "," + durEndTime + "," + op + "," + 1 + "," + 0 + "," + fg + "," + 0 + "," + generatedNum[x] + "," + inputNum[x] + "," + "failure" + "," + durStartTime + "," + dsItemNumber + ",");
                }else{    //READING
                    logResultsRST(0, testIndex + "," + "DigitSpan" + "," + durationTime + "," + durEndTime + "," + op + "," + 1 + "," + 0 + "," + fg + "," + 0 + "," + generatedNum[x] + "," + inputNum[x] + "," + "failure" + "," + durStartTime + "," + dsItemNumber + ",");
                }
            }else{ //TRAINING
                checkLight(false, 600);
                //logTrain(0, testIndex + "," + "DigitSpan" + "," + durationTime + "," + durEndTime + "," + op + "," + 1 + "," + 0 + "," + fg + "," + 0 + "," + generatedNum[x] + "," + inputNum[x] + "," + "failure" + "," + durStartTime + "," + dsItemNumber + ",");
            }
        }

        x++;
        document.getElementById("inputUser").value = "";
        if(x >= y){              //Se è l'ultimo test aggiorna il log di recap
            dsTotScore += grade/op;
            dsPartialScore += grade/op;

            if(vvv !== 1 && vvv !== 4){
                if(ordineST === 0){
                    if(combOST[op-2] === 2){
                        logOSTRecap("" + op + "," + (combOST[op-2]-1) + "," + grade + "," + dsPartialScore + ",");
                    }else if(combOST[op-2] === 1){
                        logOSTRecap("" + op + "," + (combOST[op-2]+1) + "," + grade + "," + dsPartialScore + ",");
                    }else if(combOST[op-2] === 0){
                        logOSTRecap("" + op + "," + (combOST[op-2]+3) + "," + grade + "," + dsPartialScore + ",");
                    }
                }

                if(ordineST === 1){
                    if(combRST[op-2] === 2){
                       logRSTRecap("" + op + "," + (combRST[op-2]-1) + "," + grade + "," + dsPartialScore + ",");
                    }else if(combRST[op-2] === 1){
                        logRSTRecap("" + op + "," + (combRST[op-2]+1) + "," + grade + "," + dsPartialScore + ",");
                    }else if(combRST[op-2] === 0){
                        logRSTRecap("" + op + "," + (combRST[op-2]+3) + "," + grade + "," + dsPartialScore + ",");
                    }
                }    
            }

            ControlloCentrale();  
        }
        else
        {
            numcont++;
            document.getElementById("lgInsertNumber").innerHTML = "Inserisci il numero " + numcont;
            startTime = new Date();
            durStartTime = new Date(new Date().getTime()).toLocaleTimeString() + " ." + new Date(new Date().getTime()).getMilliseconds();
        }
    }
}   

// finisce i task e salva sui file excel tutti i dati raccolti
function endIt(){    
    var p1 = [
        '<div id="p5">Il test è terminato. <br>Grazie!</div>'   //IN CASO QUA SI AGGIUNGE LINK AL TEST DI COMPRENSIBILITà
    ].join('');
    
    cleanWindow();
    document.getElementById("spanArea").innerHTML += p1;
    saveResults2();
    
    //document.getElementById("uploadButton").addEventListener("click", formSave);
    formSave();
}

function formSave(){
    //event.preventDefault();

    //var filenameST = userId + "TrainingST" + ".csv";
    var filenameOST = userId + "OST" + ".csv";
    var filenameRST = userId + "RST" + ".csv";
    //var myBlobST = new Blob([testoRisultati], {type:"text/csv"});
    var myBlobOST = new Blob([testoRisultati3], {type:"text/csv"});
    var myBlobRST = new Blob([testoRisultati5], {type:"text/csv"});
    //var fileST = new File([myBlobST], filenameST);
    var fileOST = new File([myBlobOST], filenameOST);
    var fileRST = new File([myBlobRST], filenameRST);

    //var formDataST = new FormData();
    var formDataOST = new FormData();
    var formDataRST = new FormData();
    //formDataST.append('fileToUpload', fileST);
    formDataOST.append('fileToUpload', fileOST);
    formDataRST.append('fileToUpload', fileRST);
    

/*     var xhr = new XMLHttpRequest();
    //xhr.open('POST', 'RisultatiTest', true);
    xhr.open('POST', 'https://brocciagi.github.io/upload.php', true);
    xhr.onload = function (){
        //if (xhr.status !== 200) 
        //{
        //  alert('An error occurred!');
        //}
        console.log("test")
    };

    xhr.send(formDataST); */
    
    var xhr2 = new XMLHttpRequest();
    //xhr2.open('POST', 'RisultatiTest', true);
    xhr2.open('POST', 'https://brocciagi.github.io/upload.php', true);
    xhr2.onload = function () 
    {
/*         if (xhr2.status !== 200) 
        {
          alert('An error occurred!');
        } */
        console.log("test")

    };

    xhr2.send(formDataOST);
    
    var xhr3 = new XMLHttpRequest();
    //xhr3.open('POST', 'RisultatiTest', true);
    xhr3.open('POST', 'https://brocciagi.github.io/upload.php', true);
    xhr3.onload = function () 
    {
/*         if (xhr3.status !== 200) 
        {
          alert('An error occurred!');
        } */
        console.log("test")

    };

    xhr3.send(formDataRST);

}
