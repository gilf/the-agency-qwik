import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/shared/header/header';

export default component$(() => {
  return (
    <>
      <main>
        <Header />
        <div id="body">
          <section id="main" className="content-wrapper main-content clear-fix">
            <Slot />
          </section>
        </div>
      </main>
    </>
  );
});
