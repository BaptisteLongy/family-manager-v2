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
                list_id
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

export const DELETE_ITEM = gql`
    mutation deleteItem($id: Int!) {
        deleteOneItem(where: { id: $id }) {
            id
            name
        }
    }
`

export const DELETE_LIST = gql`
    mutation deleteList($id: Int!) {
        deleteOneList(where: { id: $id}) {
            id
            name
        }
    }
`