
import { createEdSignature } from "cassandra-client"
import ComponentExample from 'lov3/src/ComponentExample'
import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'

// Little Canvas things
var canvas: HTMLCanvasElement = document.querySelector("#party"),
    ctx = canvas.getContext('2d')

// Set Canvas to be window size
canvas.width = window.innerWidth
canvas.height = window.innerHeight
// canvas.style.opacity = '.05'
canvas.style.position = 'absolute'
canvas.style.pointerEvents = 'none'
canvas.style.zIndex = '-1'

// Configuration, Play with these
var config = {
    particleNumber: 800,
    maxParticleSize: 6,
    maxSpeed: 40,
    colorVariation: 50
}

// Some Variables hanging out
let particles = []

function drawBg(ctx: CanvasRenderingContext2D) {

    const cw = canvas.width
    const ch = canvas.height
    // linear-gradient( to bottom right, #91defe, #99c0f9, #bdb6ec, #d7b3e3, #efb3d5, #f9bccc )
    const grd = ctx.createRadialGradient(cw, 0, 1, cw, ch, cw);

    grd.addColorStop(.0, "#f9bccc")
    grd.addColorStop(.1, "#efb3d5")
    grd.addColorStop(.6, "#d7b3e3")
    grd.addColorStop(.8, "#bdb6ec")
    grd.addColorStop(.9, "#99c0f9")
    grd.addColorStop(1, "#91defe")

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(10, 10, 150, 80);

    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

// Particle Constructor
var Particle = function (x, y) {
    // X Coordinate
    this.x = x || Math.round(Math.random() * canvas.width)
    // Y Coordinate
    this.y = y || Math.round(Math.random() * canvas.height)
    // Radius of the space dust
    this.r = Math.ceil(Math.random() * config.maxParticleSize)
    // Color of the rock, given some randomness
    this.c = `rgba(255, 255, 255, ${Math.random() - .4})`
    // Speed of which the rock travels
    this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7)
    // Direction the Rock flies
    this.d = Math.round(Math.random() * 360)
}


// Used to find the rocks next point in space, accounting for speed and direction
var updateParticleModel = function (p) {
    var a = 180 - (p.d + 90) // find the 3rd angle
    p.d > 0 && p.d < 180 ? p.x += p.s * Math.sin(p.d) / Math.sin(p.s) : p.x -= p.s * Math.sin(p.d) / Math.sin(p.s)
    p.d > 90 && p.d < 270 ? p.y += p.s * Math.sin(a) / Math.sin(p.s) : p.y -= p.s * Math.sin(a) / Math.sin(p.s)
    return p
}

// Just the function that physically draws the particles
// Physically? sure why not, physically.
var drawParticle = function (x, y, r, c) {
    ctx.beginPath()
    ctx.fillStyle = c
    ctx.arc(x, y, r, 0, 2 * Math.PI, false)
    ctx.fill()
    ctx.closePath()
}

function dimBound(a: number, b: number, p: number) {
    var f = b - a, g = b - p;
    return (Math.abs(f) >= Math.abs(g)) && (Math.sign(f) === Math.sign(g));
}


// Remove particles that aren't on the canvas
var cleanUpArray = function () {
    particles = particles.filter(p => {
        return dimBound(0, canvas.width, p.x) && dimBound(canvas.height, 0, p.y)
    })
}


var initParticles = function (numParticles, x?, y?) {
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(x, y))
    }
    particles.forEach((p) => {
        drawParticle(p.x, p.y, p.r, p.c)
    })
}


// Our Frame function
function frame() {
    // Draw background first
    drawBg(ctx)
    // Update Particle models to new position
    particles.map((p) => {
        return updateParticleModel(p)
    })
    // Draw em'
    particles.forEach((p) => {
        drawParticle(p.x, p.y, p.r, p.c)
    })
    // Play the same song? Ok!
    requestAnimationFrame(frame)
}

// Click listener
function spreadLove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    var x = event.clientX,
        y = event.clientY
    cleanUpArray()
    if (particles.length < 50) {
        initParticles(config.particleNumber, x, y)
    }
}

// First Frame
frame()

// First particle explosion
const intialParticleAmount = Math.floor(Math.random() * 150) + 50

initParticles(intialParticleAmount)


// most plugins are available without further configuration needed.
const appStyle = createUseStyles({
    main: {
        // backgroundImage: 'linear-gradient( to bottom right, #91defe, #99c0f9, #bdb6ec, #d7b3e3, #efb3d5, #f9bccc )',
        minHeight: '100vh',
        fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe WPC', 'Segoe UI', system-ui, 'Ubuntu', 'Droid Sans', sans-serif`
    },
    justABox: {
        border: '1px solid red',
        padding: '25px'
    },
    introContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        placeContent: 'center',
        minHeight: '100vh',
    },
    intoLabels: {
        fontSize: '30px',
        color: '#ffffffab',
    },
    heading: {
        fontSize: '120px',
        color: '#ffffff',
        fontWeight: 900,
    }
})

export default () => {

    const [walletAdress, setWalletAdress] = useState('---')



    const createSig = async () => {
        const adress = await createEdSignature('blabla')

        setWalletAdress(adress)
    }

    const appStyleClasses = appStyle()

    return (
        <div onClick={spreadLove} className={appStyleClasses.main}>
            <div className={appStyleClasses.introContainer}>

                <div className={appStyleClasses.intoLabels}>Hello Cassandra!</div>
                <div className={appStyleClasses.heading}>LOV3</div>
                <div style={{ fontSize: '20px' }} className={appStyleClasses.intoLabels}>We've built you to spread ^</div>


                {/* <ComponentExample></ComponentExample> */}

                {/* <button onClick={createSig}>Create New Signature</button> */}
            </div>
        </div>
    )
}