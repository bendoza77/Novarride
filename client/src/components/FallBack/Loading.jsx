const Loading = () => (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5" style={{ background: '#f7f8fa' }}>
        <div className="relative w-14 h-14">
            <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                border: '2px solid #e9eaec',
                borderTopColor: '#e63946',
                animation: 'loaderSpin 0.85s linear infinite',
            }} />
            <div style={{
                position: 'absolute', inset: '6px', borderRadius: '50%',
                border: '2px solid rgba(230,57,70,0.1)',
                borderBottomColor: 'rgba(230,57,70,0.4)',
                animation: 'loaderSpin 1.4s linear infinite reverse',
            }} />
        </div>
        <p style={{ color: '#9ca3af', fontSize: '12px', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
            LOADING
        </p>
    </div>
);

export default Loading;
