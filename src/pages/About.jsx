import React from 'react';
import { Link } from 'react-router-dom';

export function About() {
    return (
        <main>
            <section className="container my-5">
                <h2 className="text-center mb-4">Our Mission</h2>
                <p className="lead">Welcome to yet another recipe sharing website!</p>
            </section>

            <section className="container my-5">
                <h2 className="text-center mb-4">Our Story</h2>
                <p className="lead">
                    At MeltingPot, we (I) believe in the noble quest of turning dinner into a complicated adventure.
                    Our mission? To inspire home cooks to try out recipes they’ll probably never make. Because who
                    wouldn’t want to scroll through endless culinary options while contemplating takeout?
                </p>
            </section>

            <section className="container my-5">
                <h2 className="text-center mb-4">Meet the Team</h2>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h3 className="card-title">Conner M. Rivera</h3>
                                <p className="card-subtitle mb-2 text-muted">Founder & Student</p>
                                <p className="card-text">
                                    Meet Conner, the self-proclaimed coding prodigy that definitely isn't brand
                                    new to HTML, who bravely decided to tackle the monumental task of creating a
                                    recipe website for his CS260 assignment. Because, you know, when you think
                                    "cutting-edge technology," you immediately think of culinary delights and
                                    cookie-cutter designs. With his unparalleled knack for procrastination and a
                                    vision that could only be rivaled by a well-assembled Pinterest board, Conner
                                    somehow managed to pull this masterpiece together in the eleventh hour. Who
                                    needs a solid grasp of algorithms when you can whip up a mediocre site about
                                    spaghetti instead? Bravo, Conner, truly groundbreaking work!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h3 className="card-title">That's it!</h3>
                                <p className="card-text">There's no one else! It's just Conner!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container my-5">
                <h2 className="text-center mb-4">Get In Touch</h2>
                <p className="lead">
                    We’d love to hear from you! Especially if you have tips on how to cook or if you just want to
                    discuss why this website exists at all. Reach out to us at{" "}
                    <Link to="/bad" className="text-decoration-none">
                        contact@meltingpot.com
                    </Link>
                    , and maybe Conner will get back to you—after he finishes binge-watching Jiu Jitsu Kaizen.
                </p>
            </section>
        </main>
    );
}

export default About;
