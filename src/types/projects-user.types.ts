export interface ProjectUser {
  id:          string;
  user_id:     string;
  client_id:   string;
  name:        string;
  description: string;
  status:      string;
  category:    string;
  hourly_rate: string;
  fixed_price: string;
  start_date:  string;
  end_date:    string;
  created_at:  Date;
  updated_at:  Date;
}
