const express = require('express')
const bcrypt = require('bcrypt')
const Taxonomia = require('../model/animals.model')
const mongoose = require('mongoose')

let button = document.getElementById('btn')

button.addEventListener("click", (e) => {
    console.log("Botão clicado")
})
