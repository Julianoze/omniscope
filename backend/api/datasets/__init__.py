from ariadne import QueryType

from .timesheets import resolve_timesheet
from .datasets_set import resolve_this_week
from .datasets import resolve_datasets

def setup_query_for_datasets(query: QueryType):
    query.set_field("timesheet", resolve_timesheet)
    query.set_field("thisWeek", resolve_this_week)
    query.set_field("datasets", resolve_datasets)