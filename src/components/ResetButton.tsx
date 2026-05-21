
export default function ResetButton({ onReset }: { onReset: () => void }) {
    return <button type="button" onClick={onReset} style={{ width: '100%', padding: '10px', backgroundColor: '#26c2ae', color: '#00474b', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', textTransform: 'uppercase' }}>Reset</button>;
}
