import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button, Card, Input } from '../components/ui';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('owner@sagumi.id');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    navigate('/admin');
  }

  return (
    <div className="mx-auto max-w-md py-8">
      <Card className="space-y-5 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sagumi-100 text-sagumi-700">
              <Lock className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-lg font-bold text-stone-900">Login Owner Sagumi</h1>
              <p className="text-xs text-stone-500">Dashboard Antrian FIFO &amp; Analytics</p>
            </div>
          </div>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-medium text-amber-800">
            Mockup
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Owner"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="owner@sagumi.id"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          <Button type="submit" className="w-full" size="lg">
            Masuk Dashboard
          </Button>
        </form>

        <div className="border-t border-stone-100 pt-4 text-center">
          <p className="mb-2 text-xs text-stone-500">
            Sprint 3 akan menghubungkan form ini ke <code className="font-mono">POST /api/v1/auth/login</code>.
          </p>
          <Button variant="secondary" className="w-full" onClick={() => navigate('/admin')}>
            Masuk Mode Demo (Tanpa Password)
          </Button>
        </div>
      </Card>
    </div>
  );
}
