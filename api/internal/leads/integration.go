package leads

import "context"

type LeadIntegration interface {
	SyncLead(ctx context.Context, lead *Lead) error
}