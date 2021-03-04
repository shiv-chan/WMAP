const quotes = [
	{
		quote: 'Live as if you were to die tomorrow. Learn as if you were to live forever.',
		author: 'Mahatma Gandhi'
	},
	{
		quote: 'That which does not kill us makes us stronger.',
		author: 'Friedrich Nietzsche'
	},
	{
		quote:
			'Be who you are and say what you feel, because those who mind don’t matter and those who matter don’t mind.',
		author: 'Bernard M. Baruch'
	},
	{
		quote: 'We must not allow other people’s limited perceptions to define us.',
		author: 'Virginia Satir'
	},
	{
		quote: 'Do what you can, with what you have, where you are.',
		author: ' Theodore Roosevelt'
	},
	{
		quote: 'Be yourself; everyone else is already taken.',
		author: 'Oscar Wilde'
	},
	{
		quote: 'This above all: to thine own self be true.',
		author: 'William Shakespeare'
	},
	{
		quote: 'If you cannot do great things, do small things in a great way.',
		author: 'Napoleon Hill'
	},
	{
		quote: 'If opportunity doesn’t knock, build a door.',
		author: 'Milton Berle'
	},
	{
		quote:
			'Wise men speak because they have something to say; fools because they have to say something.',
		author: 'Plato'
	},
	{
		quote: 'Strive not to be a success, but rather to be of value.',
		author: 'Albert Einstein'
	}
];

const images = [
  'https://images.unsplash.com/photo-1546514355-7fdc90ccbd03?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
	'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fG5hdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
	'https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjh8fG5hdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
	'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTF8fG5hdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
	'https://images.unsplash.com/photo-1543716091-a840c05249ec?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTJ8fG5hdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
	'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTl8fG5hdHVyZXxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60',
	'https://images.unsplash.com/photo-1483086431886-3590a88317fe?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NzV8fG5hdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
	'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nzl8fG5hdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
	'https://images.unsplash.com/photo-1565785992686-8fcc79300dcb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTExfHxuYXR1cmV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
	'https://images.unsplash.com/photo-1546697710-9877687facd0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTE3fHxuYXR1cmV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
	'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjcwfHxuYXR1cmV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
];

const button = document.querySelector('button');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const image = document.querySelector('img');

//generate a random number 0 to 10
const genNum = () => {
	return Math.floor(Math.random() * 11);
};

button.addEventListener('click', () => {
	const quoteIndex = genNum();
	quote.textContent = `${quotes[quoteIndex].quote}`;
	author.textContent = `${quotes[quoteIndex].author}`;
	const imageIndex = genNum();
	image.setAttribute('src', images[imageIndex]);
});
