import axios from 'axios';

export function getThemeTitle(){
	return new Promise((resolve, reject) => {
		axios.get('api/themes').then((res) => {
			resolve(res);
		});
	});
}