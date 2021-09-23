let counter = 0;

const recursive = () =>{
    if (counter < 11){
        counter++
    }else{
        return;
    }

    recursive();
}

recursive()

console.log(counter)