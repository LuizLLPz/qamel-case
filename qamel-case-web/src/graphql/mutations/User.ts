import { gql } from "@apollo/client";

export const registerMutation = (uname: string, email: string, pass: string) => {
    return gql`
    mutation {
		register(username: "${uname}", password: "${pass}"
		email: "${email}"
		) {
			id, 
			error {
					message
			}
		}
	  }
    `;
}

