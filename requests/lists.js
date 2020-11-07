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

export const ADD_ITEM_TO_LIST = gql`
    mutation addItemToList($name: String!, $list_id: Int!) {
        createOneItem(data: { name: $name, list: { connect: { id: $list_id } } }) {
            id
            name
            list_id
        }
    }
`