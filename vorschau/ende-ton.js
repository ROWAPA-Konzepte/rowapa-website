/* Vorschau: Variante B setzt die Grundfarben der Abschnitte, bevor der Farbfluss startet */
(function(){var v="";try{v=localStorage.getItem("rw-ende")||""}catch(e){}if(!/^[abc]$/.test(v))v="a";document.documentElement.setAttribute("data-ende",v);
if(v==="b"){var T={ergebnisse:"ink",branche:"white",cas:"white",wissen:"snow",faq:"white"};for(var k in T){var e=document.getElementById(k);if(e)e.setAttribute("data-tone",T[k])}}})();
