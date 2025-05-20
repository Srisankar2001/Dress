"use client"

import React, { useState } from "react"
import "./page.css"
import showToast from "@/utils/toast"
import validate from "./validation"
import axiosInstance from "@/config/axiosConfig"

const AboutUs = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const error = validate(formData)
        setErrors(error)
        if (Object.values(error).every(item => item === null)) {
            try {
                const data = {
                    name: formData.name.trim(),
                    email: formData.email.toLowerCase().trim(),
                    message: formData.message.trim()
                }
                const response = await axiosInstance.post("/mail/send", data)
                if (response.data.status) {
                    showToast(true, response.data.message)
                }
            } catch (err) {
                showToast(false, err.response?.data?.message || "Internal Server Error")
            }
        }
    }

    return (
        <div className="about-container">
            <header className="about-header">
                <h1>About ERMINE</h1>
                <p className="about-tagline">Crafting Elegance, Inspiring Confidence</p>
            </header>

            <section className="about-section">
                <h2>Our Mission</h2>
                <p>
                    At ERMINE, we strive to redefine fashion by blending timeless elegance with modern innovation. Our mission is to empower individuals through high-quality, sustainable clothing that reflects their unique style. Based in Kinniya, Trincomalee, we are committed to ethical practices and community engagement.
                </p>
            </section>

            <section className="about-section">
                <h2>Our Team</h2>
                <div className="about-team">
                    <div className="about-team-member">
                        <h3>Ayesha Hanoon</h3>
                        <p>Founder & Creative Director</p>
                        <p>Ayesha brings 5 years of fashion design experience, with a passion for sustainable materials.</p>
                    </div>
                    <div className="about-team-member">
                        <h3>Mohamed Ihthisham</h3>
                        <p>Operations Manager</p>
                        <p>Mohamed ensures our supply chain runs smoothly, focusing on efficiency and quality.</p>
                    </div>
                    <div className="about-team-member">
                        <h3>Haneef Ahamed</h3>
                        <p>Marketing Lead</p>
                        <p>Haneef crafts our brand story, connecting with customers through creative campaigns.</p>
                    </div>
                </div>
            </section>

            <section className="about-section">
                <h2>Our History</h2>
                <p>
                    Founded in 2019, ERMINE started as a small boutique in Trincomalee, offering bespoke clothing. Over the years, we’ve grown into a regional leader, opening stores in Colombo and Trincomalee. In 2025, we launched our online platform, making our designs accessible worldwide. Today, ERMINE is known for its commitment to quality, sustainability, and customer satisfaction.
                </p>
            </section>

            <section className="about-section about-contact">
                <h2>Contact Us</h2>
                <form className="about-contact-form" onSubmit={handleSubmit}>
                    <div className="about-form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            disabled={loading}
                        />
                        {errors.name && <p className="about-error">{errors.name}</p>}
                    </div>
                    <div className="about-form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            disabled={loading}
                        />
                        {errors.email && <p className="about-error">{errors.email}</p>}
                    </div>
                    <div className="about-form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your message"
                            disabled={loading}
                        />
                        {errors.message && <p className="about-error">{errors.message}</p>}
                    </div>
                    <div className="about-form-buttons">
                        <button type="submit" disabled={loading}>
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ name: "", email: "", message: "" })}
                            disabled={loading}
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default AboutUs