    var canvas = document.getElementById("myCanvas");
    var info = document.getElementById("info");
    var choix = document.getElementById("menu");
    var explications = document.getElementById("explications");
    var jeu = document.getElementById("jeu");
    var continuer = document.getElementById("boutoncontinuer");
    var retour = document.getElementById("boutonretour");


    var ctx = canvas.getContext("2d");
    
    var couleurchoisie;
    var couleurtxt1 = "#1C4D7D";
    var couleurtxt2 = "#1C4D7D";
    var setup = true;
    var couleur;
    var nbcouleur;
    var score;
    var couprestant;
    var matrix = [];
    var statut = 1;

    var nbmenu = 2;
    var niveau = 1;
    var zoneobtenues;

    
    
    function draw(){
        if (statut == 1){
            menu();
        }
        if (statut == 2){
            info.style.display = "none";
            choix.style.display = "none";
            modedejeu1();
        }
        if (statut == 3){
        explications.style.display = "flex";
        info.style.display = "none";
        jeu.style.display = "none";
        choix.style.display = "none";
        boutonretour.style.display = "flex";
        }
    }
    


//------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------

    function menu(){
        jeu.style.display = "flex";
        explications.style.display = "none";
        boutons.style.display = "none";
        choix.style.display = "flex";
        info.style.display = "flex";
        boutoncontinuer.style.display = "none";
        boutonretour.style.display = "none";
        if (setup == true){
            for (let i = 0; i <20   ; i++) {
                matrix[i] = [];
                for (let j = 0; j <40   ; j++) {
                    nbcouleur = getRandomInt(1,6);
                    choixcouleur(nbcouleur);
                rectangle(j*20,i*20,20,20,couleur);
                }
            }
            rectangle(160,100,480,180,"#ffffff")
            rectangle(180,80,440,20,"#ffffff")
            rectangle(180,280,440,20,"#ffffff")
            rectangle(0,0,1,1,"#212F3D");
            rectangle(0,399,1,1,"#212F3D");
            rectangle(799,399,1,1,"#212F3D");
            rectangle(799,0,1,1,"#212F3D");
            
                    ctx.font = "40px proxima";
                    ctx.textAlign = 'center';
                    ctx.fillStyle = "#1C4D7D";
                    ctx.fillText("Jouer", 400, 150);
                    ctx.fillText("Comment jouer ?", 400, 250);
                    
            
            setup = false;
        }
    }

    function modedejeu1(){
    
        if (setup == true){
    
            boutons.style.display = "flex";
            
            couprestant = 42 - niveau*2;
            generation();
            matrix[0][0] += 10;
            choixcouleur(matrix[0][0] - 10);
            rectangle(0,0,20,20,couleur);
            setup = false; 
        }
    
        zonesoccupeecouleur();
        zonesoccupee();
        verifproxi();
        rectangle(600,0,200,400,"#212F3D")
            ctx.font = "30px proxima";
            ctx.textAlign = 'center';
            ctx.fillStyle = "#F0E68C";
            ctx.fillText("Changements", 700, 30);
            ctx.fillText("Restants : ", 700, 60);
            ctx.fillText(couprestant, 700, 90);
            ctx.fillText("Pourcentage :", 700, 220);
            ctx.fillText( Math.round((zoneobtenues/6) * 10) / 10 + "%", 700, 250);
            ctx.fillText("Niveau : " + niveau, 700, 350);
        bord();
            zoneobtenues = 0;
        for (let i = 0; i <20   ; i++){
            for (let j = 0; j <30   ; j++) {
                if (matrix[i][j] > 10){
                    zoneobtenues += 1;
                }
            }
        }
        
        
        
        if (couprestant == 0 && zoneobtenues < 600){
            ctx.font = "40px proxima";
            ctx.textAlign = 'center';
            ctx.fillStyle = "#212F3D";
            ctx.fillText("Défaite", 300, 200);
            ctx.font = "25px proxima";
            boutonretour.style.display = "flex";
            statut = 10;
        }

        if (zoneobtenues == 600){
            ctx.font = "40px proxima";
            ctx.textAlign = 'center';
            ctx.fillStyle = "#212F3D";
            ctx.fillText("Victoire", 300, 200);
            ctx.font = "25px proxima";
            boutoncontinuer.style.display = "flex";
            statut = 11;
    }
    }

    function retourmenu(){
        statut = 1;
        niveau = 1;
        setup = true;
    }
    
    function continuerniveau(){
        setup = true;
        niveau += 1;
        statut = 2;
        boutoncontinuer.style.display = "none";
    }
    
    function generation(){
        for (let i = 0; i <20   ; i++) {
            matrix[i] = [];
            for (let j = 0; j <30   ; j++) {
                nbcouleur = getRandomInt(1,6);
                choixcouleur(nbcouleur);
                matrix[i][j] = nbcouleur;
            rectangle(j*20,i*20,20,20,couleur);
            }
        }
    }
    
    function verifproxi(){
        for (let i = 0; i <20   ; i++){
            for (let j = 0; j <30   ; j++) {
                    if (i<19) {
                        if (matrix[i+1][j] == matrix[i][j] - 10){
                            matrix[i+1][j] += 10;
                        }
                    }
                    if (j< 29){
                        if (matrix[i][j+1] == matrix[i][j] - 10){
                            matrix[i][j+1] += 10;
                        }
                    }
                    if (i > 0) {
                        if (matrix[i-1][j] == matrix[i][j] - 10){
                            matrix[i-1][j] += 10;
                            }
                        }
                    if (j> 0){
                        if (matrix[i][j-1] == matrix[i][j] - 10){
                            matrix[i][j-1] += 10;}
                    }
                }
            }
    }
    
    function zonesoccupeecouleur(){
        for (let i = 0; i <20   ; i++){
            for (let j = 0; j <30   ; j++) {
                if (matrix[i][j] > 10){
                    if (couleurchoisie == 1){
                        couleur = "#C0392B";
                        matrix[i][j] = 11;  
                    }else if (couleurchoisie == 2){
                        couleur = "#2980B9";
                        matrix[i][j] = 12;
                    }else if (couleurchoisie == 3){
                    couleur = "#2ECC71";
                        matrix[i][j] = 13;
                    }else if (couleurchoisie == 4){
                    couleur = "#F1C40F";
                        matrix[i][j] = 14;
                    }else if (couleurchoisie == 5){
                    couleur = "#8E44AD";
                        matrix[i][j] = 15;
                    }
                    rectangle(j*20,i*20,20,20,couleur);
                }
            }
        }
    }
    
    function zonesoccupee(){
        for (let i = 0; i <20   ; i++){
            for (let j = 0; j <30   ; j++) {
                if (matrix[i][j] > 10){
                    rectangle(8 + j*20,8 + i*20,4,4,"#f5f5f5");
                }
            }
        }
    }
    
    function choixcouleur(input){
        if (input == 1){
            couleur = "#C0392B";
        }else if (input == 2){
            couleur = "#2980B9";
        }else if (input == 3){
            couleur = "#2ECC71";
        }else if (input == 4){
            couleur = "#F1C40F";
        }else if (input == 5){
            couleur = "#8E44AD";
        }
    }
    
    function user(choice){
        if (choice != matrix[0][0] - 10){
            couleurchoisie = choice;
            couprestant -= 1;
        }
    }

    function choixmenu(choice){
        if (choice == 1){
                nbmenu -= 1;
        }
        if (choice == 2) {
                nbmenu += 1;
            }
                if (nbmenu == 0){
                    nbmenu = 2;
                }else if (nbmenu == 3){
                    nbmenu = 1;
                }
        
                if (nbmenu == 1){
                    rectangle (310,135,20,2,"#1C4D7D");
                    rectangle (470,135,20,2,"#1C4D7D");
        
                    rectangle (200,235,20,2,"#ffffff");
                    rectangle (575,235,20,2,"#ffffff");
                }else if (nbmenu == 2){
                    rectangle (200,235,20,2,"#1C4D7D");
                    rectangle (575,235,20,2,"#1C4D7D");
        
                    rectangle (310,135,20,2,"#ffffff");
                    rectangle (470,135,20,2,"#ffffff");
                }
        
                if (choice == 3 && nbmenu == 1) {
                    setup = true;
                    statut = 2;
                }
                if (choice == 3 && nbmenu == 2) {
                    setup = true;
                    statut = 3;
                }
            }
    
    function rectangle(x,y,w,h,c) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fillStyle = c;
        ctx.fill();
        ctx.closePath();
    }
    
    function bord(){
        rectangle(0,0,1,1,"#212F3D");
        rectangle(0,399,1,1,"#212F3D");
        rectangle(599,399,1,1,"#212F3D");
        rectangle(599,0,1,1,"#212F3D");
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }

    setInterval(draw, 10); 