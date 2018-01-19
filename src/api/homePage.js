import axios from 'axios';

export function getSlider(){
	return new Promise((resolve, reject) => {
		axios.get('api/news/latest').then((res) => {
			resolve(res);
		});
	});
}

export function getNews(){
	return new Promise((resolve, reject) => {
		axios.get('api/news/latest').then((res) => {
			resolve(res);
		});
	});
}