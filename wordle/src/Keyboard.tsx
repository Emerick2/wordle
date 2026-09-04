interface Keyboard {
    character : string;
	deleteButton : boolean;
	enterButton : boolean;
}

export default function PressAKey({character, deleteButton, enterButton} : Keyboard) {
	console.log("ici");
	console.log(character + deleteButton + enterButton);
	// return(
	// 	<>
	// 	<p>{character} {deleteButton} {enterButton}</p>
		
	// 	</>
	// )
}