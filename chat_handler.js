module.exports = {
    formatPseudo : (message, tags) => {
        let formatedMsg;
        if(message.includes("$pseudo")) {
           formatedMsg = message.replace("$pseudo", tags.username);
        }
        return formatedMsg;
    },

    checkUppercase : (message) =>
        // Exclure @, LUL, espace
    {
        //On verifie si moins de 5 caractères ou autres cas d'exclusions
        if(message.length<5) {
            return false;
        }
        let num = 0;

        for(let i = 0; i < message.length ; i++)
        {
            //On vérifie si c'est une majuscule
            if(message[i]!=message[i].toLowerCase() )
            {
                num+=1;
            }
        }
        return (num >= message.length *0.6);
    }


}