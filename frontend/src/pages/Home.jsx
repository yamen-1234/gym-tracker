import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { HeroIllustration, TrackerIllustration, GraphIllustration } from '../components/Illustrations';
import './Home.css';

const reviews = [
  {
    name: 'Omar K.',
    role: 'Powerlifter, 2 years logging',
    quote:
      'I stopped guessing whether I was actually getting stronger. The monthly grid makes plateaus impossible to miss.',
  },
  {
    name: 'Salma R.',
    role: 'Started 6 months ago',
    quote:
      'Every other app felt built for bodybuilders with a coach. This one just tracks what I actually do, simply.',
  },
  {
    name: 'Marco T.',
    role: 'Home gym, self-trained',
    quote:
      'The muscle comparison arrows are such a small thing but they keep me honest week to week.',
  },
];

const stats = [
  { value: '2,300+', label: 'workouts logged' },
  { value: '412', label: 'early members' },
  { value: '4.8/5', label: 'average rating' },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero__text">
            <h1>Track every rep. Watch the progress add up.</h1>
            <p>
              A straightforward gym tracker built for people who'd rather lift than fight with
              spreadsheets.
            </p>
            <div className="hero__actions">
              <Link to="/auth?mode=signup">
                <Button variant="primary">Start tracking</Button>
              </Link>
              <a href="#tracker">
                <Button variant="secondary">See how it works</Button>
              </a>
            </div>
          </div>
          <div className="hero__art">
            <HeroIllustration className="hero__illustration" />
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="reviews">
          <div className="reviews__stats">
            {stats.map((s) => (
              <div key={s.label} className="reviews__stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="reviews__grid">
            {reviews.map((r) => (
              <blockquote key={r.name} className="review-card squircle">
                <p>&ldquo;{r.quote}&rdquo;</p>
                <footer>
                  <strong>{r.name}</strong>
                  <span>{r.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Feature 1: Tracker */}
        <section id="tracker" className="feature">
          <div className="feature__art">
            <TrackerIllustration className="feature__illustration" />
          </div>
          <div className="feature__text">
            <span className="feature__eyebrow">Tracker</span>
            <h2>Log sets in seconds, see months at a glance</h2>
            <p>
              Every exercise gets its own grid — a full month of training laid out like a
              calendar, with sets and reps you can fill in with a click or the arrow keys. No
              menus to dig through mid-set.
            </p>
          </div>
        </section>

        {/* Feature 2: Graphs */}
        <section id="graphs" className="feature feature--reverse">
          <div className="feature__art">
            <GraphIllustration className="feature__illustration" />
          </div>
          <div className="feature__text">
            <span className="feature__eyebrow">Progress</span>
            <h2>Graphs that actually answer "am I improving?"</h2>
            <p>
              Volume, reps, and sets charted per exercise and per muscle group — so you can tell
              at a glance whether last month's training moved the needle.
            </p>
          </div>
        </section>

        {/* About */}
        <section id="about" className="about">
          <div className="about__inner squircle">
            <h2>Why this exists</h2>
            <p>
              I'm a CS student who loves the gym — and got tired of tracking workouts on paper, or
              in apps that made it harder than it needed to be. So I built the tool I actually
              wanted: something simple enough to open mid-set, and detailed enough to show real
              progress over time. Hope it helps you the way it's helped me.
            </p>
          </div>
        </section>

        <footer className="site-footer">
          <span>Gym Tracker — built by a lifter, for lifters.</span>
        </footer>
      </main>
    </>
  );
}
