import Image from 'next/image';

export default function Home() {
    return (
        <div className=''>
            <main className=''>
                <div className='wrapper'>
                    <h1>Studios Ghibli.<br />Get to know the movies catalog!</h1>
                    <p>Ready? Get started and see a full list with description, rating and more!</p>
                </div>
                
                {/* <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                /> */}

            </main>
            <footer className=''></footer>
        </div>
    );
}
