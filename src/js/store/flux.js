const getState = ({ getStore, setStore }) => {
	return {
		store: {
			contact: [],
			currentUser: ""
		},
		actions: {
			cleanUser: () => {
				setStore({ currentUser: "" });
			},
			getContacts: async () => {
				let response = await fetch(
					"https://assets.breatheco.de/apis/fake/contact/agenda/charles8ffhasnorealfriends",
					{
						method: "GET",
						headers: new Headers({
							"Content-Type": "application/json"
						})
					}
				);
				response = await response.json();
				setStore({ contact: response });
			},
			deleteSelectedContact: async item => {
				setStore({ contact: getStore().contact.filter(index => index !== item) });
				let response = await fetch("https://assets.breatheco.de/apis/fake/contact/" + item.id, {
					method: "DELETE",
					headers: new Headers({
						"Content-Type": "application/json"
					})
				});
				response = await response.json();
			},
			editContact: async (item, user) => {
				let response = await fetch("https://assets.breatheco.de/apis/fake/contact/" + user, {
					method: "PUT",
					headers: new Headers({
						"Content-Type": "application/json"
					}),
					body: JSON.stringify({
						full_name: item.name,
						email: item.email,
						agenda_slug: "charles8ffhasnorealfriends",
						address: item.address,
						phone: item.phone
					})
				});
				response = await response.json();
			},
			addNewContact: async user => {
				let found = getStore().contact.find(item => item == user);
				if (!found) setStore({ contact: [...getStore().contact, user] });
				let response = await fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					headers: new Headers({
						"Content-Type": "application/json"
					}),
					body: JSON.stringify({
						full_name: user.name,
						email: user.email,
						agenda_slug: "charles8ffhasnorealfriends",
						address: user.address,
						phone: user.phone
					})
				});
				response = await response.json();
			}
		}
	};
};

export default getState;
