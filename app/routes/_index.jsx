// export const meta = () => {  /* needed for v2 */
//   return { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },

// };

import { Link } from '@remix-run/react'; // This prevents the page from reloading when we navigate to a new page
import home from '../styles/home.css'; // Page specific approach to CSS

export default function Index() {
  return (
    <main id="content">
      <h1>Welcome to Remix!</h1>
      <p>Try our early beta and never loose track of your taskss</p>
      <p id="cta">
        <Link to="/notes">Check it out!</Link>
        {/* instead of using 'a' tags and href we use Link */}
      </p>
    </main>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: home }] // Page specific approach to CSS
}
