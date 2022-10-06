import json
import os

from core.misc import working_directory
from db import get_unique_job_id, update_job
from scheduler.slurm import slurm_submit


def submit(details, input_params):
    print("Submitting new job...")
