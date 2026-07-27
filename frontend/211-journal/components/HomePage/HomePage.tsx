import styles from "./HomePage.module.css"
import Image from "next/image"

export default function HomePage() {
    return (
        <div>
            <section className={styles.homePageWrapper}>
                <section className={styles.mainContainer}>

                    {/* Profile Section */}
                    <div className={styles.profile}>
                        <Image
                            src="/me.jpeg"
                            alt="Burak Kuruçay"
                            width={128}
                            height={128}
                            className={styles.profileAvatar}
                        />
                        <div className={styles.profileTextContainer}>
                            <h1 className={styles.profileName}>
                                Burak Kuruçay
                            </h1>
                            <h2 className={styles.profileJobTitle}>
                                Software Engineer
                            </h2>
                        </div>
                    </div>

                    {/* About Me Section */}
                    <section className={styles.aboutMeSection}>
                        <h1 className={styles.aboutMeTitle}>
                            Who Am I?
                        </h1>
                        <p className={styles.aboutMeText}>
                            Hello dear guest 👋.<br></br><br></br> 
                            I'm Burak, a Computer Engineer who just graduated from Gebze Technical University with honors. I've always been the type of person who wants to know why something works, not just how to use it, which is probably why I ended up loving operating systems and system design as much as building products people actually use.<br></br><br></br>
                            I've spent the last couple of years working on AI research, backend systems, and full-stack products using Java, Spring, Next.js, and React, always somewhere between the code and the people who end up using it.<br></br><br></br>
                            When I step away from the keyboard, I'm usually playing acoustic guitar or, oddly enough, reading film critiques instead of actually watching the movies.
                        </p>
                    </section>

                </section>
            </section>
        </div>
    )
}