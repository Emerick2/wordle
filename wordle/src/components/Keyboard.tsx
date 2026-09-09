import {SetLetter} from "./Grid";
import type { AttemptProps } from "./Grid";

export interface KeyboardProps {
    character : string;
	deleteButton : boolean;
	enterButton : boolean;
	attempts : AttemptProps[];
	ligneId : number;
	characterId : number;
}

export default function PressAKey({character, deleteButton, enterButton,  attempts, ligneId, characterId} : KeyboardProps) : AttemptProps[] {
	if (deleteButton){
		if (characterId>0){
		    return SetLetter(character, attempts, ligneId, characterId-1);
		} else {
			return attempts;
		}
	}

	return SetLetter(character, attempts, ligneId, characterId);
	// return(
	// 	<>
	// 	<p>{character} {deleteButton} {enterButton}</p>
		
	// 	</>
	// )
}