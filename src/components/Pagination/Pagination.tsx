import React, { Component } from 'react'

export default class BookStore1 extends Component {

    constructor(props: any) {
        super(props);
        this.state = {
            notes: [],
            redirect: null,
            openDropDown: false,
            openbutton: false
        }

    }
}