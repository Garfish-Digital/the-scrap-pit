import { ImpactButton } from './ImpactButton'

export function Impact() {
  return (
    <div className="proto">
      <div className="cluster">
        <ImpactButton variant="accent">Start Free Trial</ImpactButton>
        <ImpactButton variant="ink">View Training</ImpactButton>
        <ImpactButton variant="victory">View Pricing</ImpactButton>
      </div>
      <p className="proto__hint muted">Hover: ghost white slams in from the left and holds. Press for the impact.</p>
    </div>
  )
}
