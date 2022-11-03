from mongoengine import signals
from .utils.misc import utc_time


# Borrowed from https://docs.mongoengine.org/guide/signals.html
def handler(event):
    """Signal decorator to allow use of callback functions as class decorators."""

    def decorator(fn):
        def apply(cls):
            event.connect(fn, sender=cls)
            return cls

        fn.apply = apply
        return fn

    return decorator


# Modified from https://docs.mongoengine.org/guide/signals.html
@handler(signals.pre_save)
def update_last_updated(sender, document):
    document.last_updated = utc_time()
