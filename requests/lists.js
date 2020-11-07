import { gql } from '@apollo/client'

export const ALL_LISTS = gql`
  query lists {
    lists {
      id
      name
    }
  }
`

export const LIST = gql`
    query list($id: Int) {
        list(where: {id: $id}) {
            name
            items {
                id
                name
            }
        }
    }
`