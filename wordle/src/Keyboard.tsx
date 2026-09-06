import {SetLetter} from "./components/Grid";
import type { AttemptProps } from "./components/Grid";

export interface KeyboardProps {
    character : string;
	deleteButton : boolean;
	enterButton : boolean;
	attempts : AttemptProps[];
	ligneId : number;
	characterId : number;
}

export default function PressAKey({character, deleteButton, enterButton,  attempts, ligneId, characterId} : KeyboardProps) : AttemptProps[] {
	console.log(character + deleteButton + enterButton);
	return SetLetter(character, attempts, ligneId, characterId);
	// return(
	// 	<>
	// 	<p>{character} {deleteButton} {enterButton}</p>
		
	// 	</>
	// )
}