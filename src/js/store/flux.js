const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			setContact: contact => {
				setStore({ contact: contact });
			},

			getSingleContact: async id => {
				let response = await fetch("https://assets.breatheco.de/apis/fake/contact/" + id);
				response = await response.json();
				getActions().setContact(response);
			},

			getAllContacts: async () => {
				let response = await fetch(
					"https://assets.breatheco.de/apis/fake/contact/agenda/charles8ffhasnorealfriends"
				);
				response = await response.json();
				setStore({ contacts: response });
			},

			createContact: async data => {
				let response = await fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					mode: "cors",
					redirect: "follow",
					headers: new Headers({
						"Content-Type": "application/json"
					}),
					body: JSON.stringify({
						name: data.name,
						email: data.email,
						agenda_slug: "charles8ffhasnorealfriends",
						address: data.address,
						phone: data.phone
					})
				});
				response = await response.json();
				getActions().getAllContacts();
			},

			deleteContact: async id => {
				let response = await fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "DELETE",
					mode: "cors",
					redirect: "follow",
					headers: new Headers({
						"Content-Type": "application/json"
					})
				});
				response = await response.json();
				getActions().getAllContacts();
			},

			updateContact: async (id, field) => {
				let response = await fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "PUT",
					mode: "cors",
					redirect: "follow",
					headers: new Headers({
						"Content-Type": "application/json"
					}),
					body: JSON.stringify({
						name: field.name,
						email: field.email,
						agenda_slug: "charles8ffhasnorealfriends",
						address: field.address,
						phone: field.phone
					})
				});
				response = await response.json();
				getActions().getAllContacts();
				getActions().setContact("");
			}
		}
	};
};

export default getState;
