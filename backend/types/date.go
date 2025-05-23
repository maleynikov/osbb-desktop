package types

import (
	"fmt"
	"strings"
	"time"
)

type Date struct {
	time.Time
}

const dateFormat = "2006-01-02"

func (d *Date) UnmarshalJSON(b []byte) error {
	s := strings.Trim(string(b), `"`)
	if s == "null" || s == "" {
		return nil
	}

	t, err := time.Parse(dateFormat, s)
	if err != nil {
		return fmt.Errorf("invalid date format: %w", err)
	}

	d.Time = t
	return nil
}

func (d Date) MarshalJSON() ([]byte, error) {
	return fmt.Appendf(nil, "\"%s\"", d.Format(dateFormat)), nil
}

func (d Date) String() string {
	return d.Format(dateFormat)
}
